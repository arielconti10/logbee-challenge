import React, {PureComponent} from 'react';

export default class TaskInfo extends PureComponent {

  render() {
    const {info} = this.props;

    return (
      <div>
        <div>
          {info.name}
        </div>
      </div>
    );
  }
}