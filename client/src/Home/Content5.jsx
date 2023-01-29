import React from 'react';
import { Row, Col } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getitemsToRender } from './utils';

class Content5 extends React.PureComponent {
  getitemsToRender = (data) =>
    data.map((item) => {
      return (
        <Col key={item.name} {...item}>
          <a {...item.items.wrapper}>
            <span {...item.items.img}>
              <img src={item.items.img.items} height="100%" alt="img" />
            </span>
            <p {...item.items.content}>{item.items.content.items}</p>
          </a>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const itemsToRender = this.getitemsToRender(
      dataSource.block.items
    );
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.items.map(getitemsToRender)}
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            {...dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{
                y: '+=30',
                opacity: 0,
                type: 'from',
                ease: 'easeInOutQuad',
              }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeInOutQuad' }}
              {...dataSource.block}
            >
              {itemsToRender}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content5;
