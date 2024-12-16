import {isNotEmpty} from "@bracit/common-utils";

export class Menu {
  id?: number;
  parentId?: number;
  title?: string;
  routerLink?: string;
  href?: string;
  target?: string;
  icon?: string;
  iconType?: string;
  active?: boolean;
  menuOrder?: number;
  role?: string;
  module?: string;
}

export class KTMenuItem {
  id: number | undefined;
  title: string | undefined;
  root: boolean;
  parentId?: number;
  icon?: string;
  type?: string;
  page: string | undefined;
  module?: string;
  children?: KTMenuItem[];

  constructor(
    id: number | undefined,
    title: string | undefined,
    root: boolean,
    parentId: number | undefined,
    icon: string | undefined,
    type: string | undefined,
    page: string | undefined,
    module: string | undefined) {
    this.id = id;
    this.title = title;
    this.root = root;
    this.parentId = parentId;
    this.icon = icon;
    this.type = type;
    this.page = page;
    this.module = module;
  }

  get submenu(): KTMenuItem[] | undefined | null {
    return this.hasSubmenu ? this.children : null;
  }

  get hasSubmenu(): boolean {
    return this.children != undefined && this.children.length > 0;
  }

  private hasLinkOrChild() {
    return isNotEmpty(this.page) || this.hasSubmenu;
  }

  get render(): boolean {
    return this.hasLinkOrChild() && isNotEmpty(this.title);
  }
}
