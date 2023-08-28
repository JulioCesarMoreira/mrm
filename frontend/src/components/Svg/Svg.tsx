import { createElement, ReactElement } from 'react';
import { cn } from '@lib/utils';
import * as Svgs from './SvgLibrary';

export type SvgName = keyof typeof Svgs;

export interface SvgProperties extends React.SVGProps<SVGSVGElement> {
  name: SvgName;
}

export default function Svg({
  name,
  className,
  ...properties
}: SvgProperties): ReactElement {
  return createElement(Svgs[name], {
    ...properties,
    className: cn(className),
  });
}
