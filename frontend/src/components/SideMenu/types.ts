import type { SvgName } from '../Svg/Svg';

export interface SideMenuItemProperties {
  label: string;
  svgName: SvgName;
  className?: string;
  onClickItem: () => void;
}
