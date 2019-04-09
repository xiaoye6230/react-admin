import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

export default class RichTextEditor extends Component {
    state = {
        editorState: BraftEditor.createEditorState(null)
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
  render() {
    const { editorState } = this.state;
    return (
      <div style={{border:'1px solid #d9d9d9', height: 300, borderRadius: 4}}>
        <BraftEditor
            value={editorState}
            onChange={this.handleEditorChange}
        />
      </div>
    )
  }
}
