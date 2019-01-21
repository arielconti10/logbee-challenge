import React, {PureComponent} from 'react';

export default class TaskInfo extends PureComponent {
  _renderTaskSignature() {
    const {signatureUrl} = this.props.info;
    return signatureUrl && (
      <div>
        <b>Assinatura:</b>
        <img src={signatureUrl} width='200' alt='assinatura'/>
      </div>
    )
  }
  render() {
    const {info} = this.props;
    return (
      <div>
        <div style={{color: '#fff'}}>
            <b>Endereço</b>: { info.address } <br />
            <b>Nome da tarefa</b>: { info.name} <br />
            <b>Data e hora estimada para o término</b>: { info.time } <br />
            <b>Status</b>: { info.status } <br />
            {this._renderTaskSignature()}
        </div>
      </div>
    );
  }
}
