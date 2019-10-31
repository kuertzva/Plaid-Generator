import React from 'react';
import './download.css';

export class Download extends React.Component {
  constructor(props) {
    super(props)
    this.togglePreview = this.togglePreview.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.changeFilename = this.changeFilename.bind(this);
    this.state = {
      preview: false,
      format: 'png',
      filename: 'plaid'
    };
  }

  componentDidMount() {
    const png = document.getElementById('png');
    png.checked = true;
  }


  togglePreview() {
    this.setState((state) => ({
      preview: !(state.preview)
    }));
  }

  downloadImage() {
    //alert('download triggered');
    const canvas = document.getElementById('canvas');
    const urlInput = 'image/' + this.state.format
    const image = canvas.toDataURL(urlInput);

    //alert(urlInput);

    const link = document.createElement('a');
    const filename = this.state.filename + '.'+ this.state.format;
    document.body.appendChild(link);
    link.download = filename;
    //alert(filename);
    link.href = image;
    link.click();
    document.body.removeChild(link);

  }

  changeFormat(e) {
    const target = e.target;
    const value = target.value;

    this.setState({
      format: value
    });
  }

  changeFilename(e) {
    const forbidden = ['<','>',':','"','/','\\','|','?','*'];
    const newString = e.target.value;
    const lastChar = newString[newString.length - 1];

    if(forbidden.indexOf(lastChar) >= 0) {
      alert('this is not an allowed character!')
    } else {
      this.setState((state) => ({
        filename: newString
      }));
    }

  }



  render() {

    const formats = [['png', true], ['jpeg', false], ['bmp', false], ['webp', false]]

    const radioButtons = formats.map((format) =>

      <label> {format[0].charAt(0).toUpperCase() + format[0].substring(1)}
          <input type='radio' name='radioButtons' value={format[0]}
          id={format[0]} onChange={(e) => this.changeFormat(e)}/>
      </label>

    )

    var preview;

    if(this.state.preview) {

      const canvas = document.getElementById('canvas');
      const bkgd = canvas.toDataURL('image/png');

      preview = (
        <div
          id='preview'
          style= {{
            backgroundImage: 'url(' + bkgd + ')'
          }}
        >
          <button
            id='close-preview'
            class='close-button'
            onClick={this.togglePreview}
          > X </button>
        </div>
      )

    } else {
      preview = false;
    }


  // checked={format[1]}
    return (
      <div class='overlay col-12 narrow-row'>
        {preview}
        <button
          id='download-close'
          class='close-button'
          onClick={this.props.flip}
        >
          X
        </button>
        <div id='inner-download' class='feature-box pop-up no-shadow'>
          <h1> Download </h1>
          <label>File Name:
            <input
              id='file-name'
              type='text'
              value={this.state.filename}
              onChange={(e) => this.changeFilename(e)}
            />
          </label>
          <div class='radio-options'>
            {radioButtons}
          </div>
          <div className='button-box'>
            <button
              className='option-buttons'
              id='preview-button'
              onClick={this.togglePreview}
            >
              Preview
            </button>
            <button
              className='option-buttons'
              id='download-button'
              onClick={this.downloadImage}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    )
  }
}

//export default Download;
