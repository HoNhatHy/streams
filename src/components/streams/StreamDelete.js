import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";

class StreamDelete extends React.Component {
  constructor(props) {
    super(props);
    this.actions = (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => {
            this.props.deleteStream(this.props.match.params.id);
          }}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with this title: ${this.props.stream.title}`;
  }

  render() {
    if (!this.props.stream) return null;
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.actions}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
