import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getitemsToRender } from './utils';

class Content3 extends React.PureComponent {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    let clearFloatNum = 0;
    const items = dataSource.block.items.map((item, i) => {
      const childObj = item.items;
      const delay = isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
      const liAnim = {
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad',
        delay,
      };
      const itemsAnim = { ...liAnim, x: '+=10', delay: delay + 100 };
      clearFloatNum += item.md;
      clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum;
      return (
        <TweenOne
          component={Col}
          animation={liAnim}
          key={item.name}
          {...item}
          componentProps={{ md: item.md, xs: item.xs }}
          className={
            !clearFloatNum
              ? `${item.className || ''} clear-both`.trim()
              : item.className
          }
        >
          <TweenOne
            animation={{
              x: '-=10',
              opacity: 0,
              type: 'from',
              ease: 'easeOutQuad',
            }}
            key="img"
            {...childObj.icon}
          >
            <img src={childObj.icon.items} width="100%" alt="img" />
          </TweenOne>
          <div {...childObj.textWrapper}>
            <TweenOne
              key="h2"
              animation={itemsAnim}
              component="h2"
              {...childObj.title}
            >
              {childObj.title.items}
            </TweenOne>
            <TweenOne
              key="p"
              animation={{ ...itemsAnim, delay: delay + 200 }}
              component="div"
              {...childObj.content}
            >
              {childObj.content.items}
            </TweenOne>
          </div>
        </TweenOne>
      );
    });
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.items.map(getitemsToRender)}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim key="u" type="bottom">
              <Row key="row" {...dataSource.block}>
                {items}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content3;
