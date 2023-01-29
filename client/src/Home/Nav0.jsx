import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import { getitemsToRender } from './utils';

const { Item, SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: undefined,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { phoneOpen } = this.state;
    const navData = dataSource.Menu.items;
    const navitems = navData.map((item) => {
      const { items: a, subItem, ...itemProps } = item;
      if (subItem) {
        return (
          <SubMenu
            key={item.name}
            {...itemProps}
            title={
              <div
                {...a}
                className={`header0-item-block ${a.className}`.trim()}
              >
                {a.items.map(getitemsToRender)}
              </div>
            }
            popupClassName="header0-item-child"
          >
            {subItem.map(($item, ii) => {
              const { items: childItem } = $item;
              const child = childItem.href ? (
                <a {...childItem}>
                  {childItem.items.map(getitemsToRender)}
                </a>
              ) : (
                <div {...childItem}>
                  {childItem.items.map(getitemsToRender)}
                </div>
              );
              return (
                <Item key={$item.name || ii.toString()} {...$item}>
                  {child}
                </Item>
              );
            })}
          </SubMenu>
        );
      }
      return (
        <Item key={item.name} {...itemProps}>
          <a {...a} className={`header0-item-block ${a.className}`.trim()}>
            {a.items.map(getitemsToRender)}
          </a>
        </Item>
      );
    });
    const moment = phoneOpen === undefined ? 300 : null;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            <img width="100%" src={dataSource.logo.items} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    onComplete: (e) => {
                      if (this.state.phoneOpen) {
                        e.target.style.height = 'auto';
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['sub0']}
              theme="dark"
            >
              {navitems}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
