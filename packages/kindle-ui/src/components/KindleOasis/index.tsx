import React from "react";
import styled, { css } from "styled-components";

const environmentLight = css`
	linear-gradient(
		235deg,
		rgb(203 203 203 / 100%) 0%,
		rgba(0, 0, 0, 1) 23%
	);
`;

const environmentDark = css`
    linear-gradient(
        237deg,
        rgba(191,191,191,1) 0%,
        rgba(0,0,0,1) 45%)
`;

const skinBackground = (skin: string, opacity: number) => css`
	#1a1a1a;

	/* Skin texture layer — behind screen/buttons, uses pseudo-element so filter doesn't affect content */
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: inherit;
		/* The artwork, with a noise texture overlaid via SVG for matte grain */
		background:
			/* Specular: subtle top-left highlight simulating overhead light on curved plastic */
			radial-gradient(
				ellipse at 25% 15%,
				rgba(255, 255, 255, 0.08) 0%,
				rgba(255, 255, 255, 0) 50%
			),
			/* Matte grain: SVG noise pattern to simulate plastic/resin surface texture */
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E"),
			/* Edge shadow: darker at edges for 3D depth of a curved shell */
			radial-gradient(
				ellipse at 40% 50%,
				rgba(0, 0, 0, 0) 50%,
				rgba(0, 0, 0, 0.3) 100%
			),
			/* The artwork itself */
			url(${skin});
		background-size: 100%, 300px 300px, 100%, cover;
		background-position: center, center, center, center;
		background-repeat: no-repeat, repeat, no-repeat, no-repeat;
		/* Desaturate to simulate ink/dye on matte material + slight darken */
		filter: saturate(${0.15 + opacity * 0.35}) brightness(${0.35 + opacity * 0.3}) contrast(${0.85 + opacity * 0.1});
		z-index: 0;
	}

`;

const StyledContainer = styled.div<{ dark?: boolean; skin?: string; skinOpacity?: number }>`
	@media screen and (max-width: 768px) {
		.hardButton {
			display: none;
		}
	}

	@media screen and (min-width: 767px) {
		* {
			--hbutton-height: 12.5vh;
			--hbutton-padding: 4vh;
			--border-shadow-width: 6px;
		}

		max-width: 980px;
		position: relative;
		aspect-ratio: 0.89;
		box-sizing: border-box;
		padding-left: 34px;
		padding-top: 34px;
		padding-bottom: 34px;
		padding-right: 145px;
		border-radius: 30px;
		background: ${(props) =>
			props.skin
				? skinBackground(props.skin, props.skinOpacity ?? 0.45)
				: props.dark
				? environmentDark
				: environmentLight};
		border: 8px double ${(props) => (props.skin ? "#2a2a2a" : "#3a3737")};
		overflow: hidden;
		height: 100vh;
		box-shadow: #0000004f 0px 0px 11px 6px;

		.hardButton {
			width: 10px;
			height: var(--hbutton-height);
			border-radius: 20px;
			background: ${(props) =>
				props.skin
					? "rgba(30, 30, 30, 0.8)"
					: "#414449"};
			position: absolute;
			right: 35px;
			top: 50vh;
			border-left: 3px solid black;
			border-right: 4px ridge ${(props) => (props.skin ? "#555" : "#888")};
			border-top: 1px solid black;
			border-bottom: 1px solid black;
		}

		.hardButton-up {
			transform: translateY(calc(-1 * var(--hbutton-height) - var(--hbutton-padding)));

		}

		.hardButton-down {
			transform: translateY(var(--hbutton-padding));
		}

		.shadowTop::after {
			content: "";
			position: absolute;
			z-index: 3;
			right: 1px;
			left: 1px;
			height: var(--border-shadow-width);
			display: inline;
			background: linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.5) 0%,
				rgba(0, 212, 255, 0) 100%
			);
		}

		.shadowBottom::after {
			content: "";
			position: absolute;
			z-index: 3;
			right: 1px;
			left: 1px;
			bottom: 0px;
			transform: rotate(180deg);
			height: var(--border-shadow-width);
			display: inline;
			background: linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.5) 0%,
				rgba(0, 212, 255, 0) 100%
			);
		}

		.screen::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			background: linear-gradient(
				90deg,
				rgba(0, 0, 0, 0.5) 0%,
				rgba(0, 212, 255, 0) 100%
			);
			width: var(--border-shadow-width);
			transform: translate(0px, 0px);
			z-index: 3;
		}

		.screen {
			background-color: var(--bg-color);
			padding: 0 2px;
			position: relative;
			height: 100%;
		}

		.screen::after {
			content: "";
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			background: linear-gradient(
				90deg,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 0.5) 100%
			);
			width: var(--border-shadow-width);
			transform: translate(0px, 0px);
			height: 100%;
			z-index: 3;
		}

		.content {
			overflow-y: scroll;
			overflow-x: hidden;
			height: 100%;
			background: var(--bg-color);
		}

		.content::-webkit-scrollbar {
			display: none;
		}
	}
`;

export interface IContainer {
	children: JSX.Element | JSX.Element[];
	dark?: boolean;
	/** URL of the skin image to apply as device shell texture */
	skin?: string;
	/** Opacity of the skin artwork (0-1), default 0.45. Higher = more visible artwork. */
	skinOpacity?: number;
}

const Container: React.FC<IContainer> = ({ children, dark, skin, skinOpacity }) => {
	const screenStyle = skin ? {
		position: 'relative' as const,
		zIndex: 1,
		backgroundColor: dark ? '#000' : '#f7f7f7',
	} : undefined;

	const buttonStyle = skin ? {
		position: 'relative' as const,
		zIndex: 2,
	} : undefined;

	return (
		<StyledContainer dark={dark} skin={skin} skinOpacity={skinOpacity}>
			<div className="hardButton hardButton-up" style={buttonStyle}></div>
			<div className="hardButton hardButton-down" style={buttonStyle}></div>
			<div className="screen" style={screenStyle}>
				<div className="shadowTop"></div>
				<div className="content">
					<div>{children}</div>
				</div>
				<div className="shadowBottom"></div>
			</div>
		</StyledContainer>
	);
};

export default Container;
