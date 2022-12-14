import { accentColor, baseColor, textColor } from '../../constants/colors.js';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
	box-sizing: border-box;
}
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	font-weight: 400;
	line-height: 1;
	font-family: 'Raleway', sans-serif;
	background-color: ${baseColor};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-spacing: 0;
	border-collapse: collapse;
}
button{
	height: 46px;
	border: none;
	border-radius: 5px;
	color: ${textColor};
	font-weight: 700;
	font-size: 20px;
	line-height: 23px;
	cursor: pointer;
	background-color: ${accentColor};
}
input{
	height: 58px;
	border: none;
	border-radius: 5px;
	background-color: ${textColor};
	font-size: 20px;
	padding: 0 10px;
	&::placeholder{
		color: #000;
		font-size: 20px;
	}
}
a{
	color: ${textColor};
	text-decoration: none;
	font-weight: 700;
	font-size: 15px;
	line-height: 18px;
	&:visited{
		color: ${textColor};
	}
}
`;

export default GlobalStyle;
