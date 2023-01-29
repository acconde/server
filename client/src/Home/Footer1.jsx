import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import { getitemsToRender } from './utils';
import { isImg } from './utils';

class Footer extends React.Component {
  static defaultProps = {
    className: 'footer1',
  };

  getLiitems = (data) =>
    data.map((item, i) => {
      const { title, childWrapper, ...itemProps } = item;
      return (
        <Col key={i.toString()} {...itemProps} title={null} content={null}>
          <h2 {...title}>
            {typeof title.items === 'string' &&
            title.items.match(isImg) ? (
              <img src={title.items} width="100%" alt="img" />
            ) : (
              title.items
            )}
          </h2>
          <div {...childWrapper}>
            {childWrapper.items.map(getitemsToRender)}
          </div>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const itemsToRender = this.getLiitems(dataSource.block.items);
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim
            type="bottom"
            key="ul"
            leaveReverse
            component={Row}
            {...dataSource.block}
          >
            {itemsToRender}
          </QueueAnim>
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key="copyright"
            {...dataSource.copyrightWrapper}
          >
            <div {...dataSource.copyrightPage}>
              <div {...dataSource.copyright}>
                {dataSource.copyright.items}
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
