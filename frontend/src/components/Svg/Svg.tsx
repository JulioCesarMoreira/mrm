import { createElement, ReactElement } from 'react';
import * as Svgs from './SvgLibrary';

export interface SvgProperties extends React.SVGProps<SVGSVGElement> {
	name: keyof typeof Svgs
}

export default function Svg({
	name,
	...properties
}: SvgProperties): ReactElement {
	return createElement(Svgs[name], properties);
}
