import React, { Component } from 'react';
import './App.css';

export default class SwipeImg extends Component {

  state = {
    isNewImg: false,
    preLink: '',
    link: '',
    isMouseDown: false,
    firstCoor: {
      x: 0,
      y: 0
    },
    imgCoor: {
      x: 178,
      y: 178
    },
    sidesImg: {
      maxX: '',
      minX: '',
      maxY: '',
      minY: '',
      width: 228,
      height: 228
    },
    width: 0,
    height: 0
  }

  firstState = {
        link: '',
    isMouseDown: false,
    firstCoor: {
      x: 0,
      y: 0
    },
    imgCoor: {
      x: 178,
      y: 0
    },
    sidesImg: {
      maxX: '',
      minX: '',
      maxY: '',
      minY: '',
      width: 228,
      height: 228
    }
  }

  addLink = (e) => {
    if(e.keyCode === 13) {  
      this.setState({link: e.target.value})    
    }
  }

  handleChange = (e) => {
    this.setState({preLink: e.target.value})
  } 

  addLinkButton = () => {
    this.setState({link: this.state.preLink})
  }

  isMouseDown = (e) => {    
    const firstCoor = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    }
    this.setState({ isMouseDown: true, firstCoor: {...firstCoor} })
  }

  isMouseUp = () => {  
    this.setState({ isMouseDown: false })
  }

  swipeImg = (e) => {
    if (this.state.isMouseDown) {
      const swipeCoor = {
        x: -this.state.firstCoor.x + e.nativeEvent.offsetX,
        y: -this.state.firstCoor.y + e.nativeEvent.offsetY
      }
      let imgCoor = {
        x: 0,
        y: 0
      }
      if (this.state.sidesImg.maxX > this.state.imgCoor.x + (swipeCoor.x)/15 && this.state.sidesImg.minX < this.state.imgCoor.x + (swipeCoor.x)/15){
        imgCoor = {
          x: this.state.imgCoor.x + (swipeCoor.x)/15
        }   
      } else if (this.state.sidesImg.maxX < this.state.imgCoor.x + (swipeCoor.x)/15) {
        imgCoor = {
          x: this.state.sidesImg.maxX
        }   
      } else if (this.state.sidesImg.minX > this.state.imgCoor.x + (swipeCoor.x)/15) {
        imgCoor = {
          x: this.state.sidesImg.minX
        }   
      }
      if (this.state.sidesImg.maxY > this.state.imgCoor.y + (swipeCoor.y)/15 && this.state.sidesImg.minY < this.state.imgCoor.y + (swipeCoor.y)/15){
        imgCoor = {
          y: this.state.imgCoor.y + (swipeCoor.y)/15
        }   
      } else if (this.state.sidesImg.maxY < this.state.imgCoor.y + (swipeCoor.y)/15) {
        imgCoor = {
          y: this.state.sidesImg.maxY
        }   
      } else if (this.state.sidesImg.minY > this.state.imgCoor.y + (swipeCoor.y)/15) {
        imgCoor = {
          y: this.state.sidesImg.minY
        }   
      }
      const width = this.state.width
      const height = this.state.height
      if (width >= height) {
        if((this.state.sidesImg.maxX + this.state.imgCoor.x >= 0) && (-this.state.sidesImg.minX - this.state.imgCoor.x >= 0)) {
          this.setState({imgCoor: {x : imgCoor.x, y: 178}})
        } else {
          if (this.state.sidesImg.maxX + this.state.imgCoor.x < 0){
            this.setState({imgCoor:{x: this.state.sidesImg.minX, y: 178}})
          } else {
            this.setState({imgCoor:{x: this.state.sidesImg.maxX, y: 178}})
          }
        }
      } else {
        if((this.state.sidesImg.maxY + this.state.imgCoor.y >= 0) && (-this.state.sidesImg.minY - this.state.imgCoor.y >= 0)) {
          this.setState({imgCoor: {y : imgCoor.y, x: 178}})
        } else {
          if (this.state.sidesImg.maxY + this.state.imgCoor.y < 0){
            this.setState({imgCoor:{y: this.state.sidesImg.minY, x: 178}})
          } else {
            this.setState({imgCoor:{y: this.state.sidesImg.maxY, x: 178}})
          }
        }
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
      if (prevState.link !== this.state.link) {
        this.setState({sidesImg: {...this.firstState.sidesImg}, imgCoor: {...this.firstState.imgCoor}}) 
        const img = new Image()
        img.src = this.state.link
        img.onload = () => {
        this.setState({width: img.width, height: img.height, isNewImg: true})
        }
      }
      if(this.state.isNewImg) {
        const width = this.state.width
        const height = this.state.height
        if (width > height) {
          const count = Math.round((228*width)/height)
          const maxX = Math.floor((count - 228)/2)
          const minX = Math.ceil((-count + 228)/2) 
          this.setState({sidesImg: { height: 228, width: document.querySelector('.svg-img').width.baseVal.value, maxX: maxX, minX: minX }, imgCoor: {x: 0, y: 178}})
        } else if (width < height) {
          const count = Math.round((228*height)/width)
          const maxY = Math.floor((count - 228)/2)
          const minY = Math.ceil((-count + 228)/2)
          this.setState({sidesImg: { height: document.querySelector('.svg-img').height.baseVal.value, width: 228, maxY: maxY, minY: minY }, imgCoor: {x: 178, y: 0}})
        } else {
          this.setState({sidesImg: { height: 228, width: 228 }})
        }
        this.setState({isNewImg: false})
      }
  }

  render() {
    return (
      <div className="App">
        <div>
            <input className="input-link" onKeyDown={this.addLink} onChange={this.handleChange}/>
            <button onClick={this.addLinkButton} className='a'>Запустить</button>
        </div>
        <div>
        <svg width="584" height="584" className='svg-img'>
          <defs>
            <clipPath id="image-clip-path">
              <rect x="178" y="178" width="228" height="228"/>
            </clipPath>
          </defs>
            
          <image 
            onPointerDown={this.isMouseDown} 
            onPointerUp={this.isMouseUp} 
            onPointerMove={this.swipeImg} 
            onPointerOut={this.isMouseUp}
            clipPath="url(#image-clip-path)" 
            id="image" 
            className="picture"
            x={this.state.imgCoor.x} 
            y={this.state.imgCoor.y}
            width={this.state.sidesImg.width}
            height={this.state.sidesImg.height} 
            xlinkHref={this.state.link}
            preserveAspectRatio="xMidYMid meet"
          />

        </svg>
        </div>
      </div>
    );
  }
}
