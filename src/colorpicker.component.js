import { h, render, Component } from 'preact';
import { css, StyleSheet } from 'aphrodite/no-important';
import { colorToPosition } from './colorpicker.helper.js';
import Color from 'color';

import ColorBar from './bar.component.js';
import ColorSlider from './slider.component.js';
//format out
//callback
//color

export default class ColorPicker extends Component {
	constructor(props) {
		super();
		this.state = {
			color: props.color ? Color(props.color) : Color(`hsl(0, 90%, 50%)`),
			sliderSize: 0,
		};
	}
	componentDidMount() {
		const rect = this.colorpicker.getBoundingClientRect();
		this.setState({
			width: rect.width,
			start: rect.left,
		});
	}
	render() {
		return (
			<div
				ref={ref => this.colorpicker = ref}
				class={`${css(styles.colorPicker)}`}>
				<ColorBar
					barHeight={this.state.width * .09}
					barClick={this.setColor.bind(this)}/>
				<ColorSlider
					barStart={this.state.start}
					setColor={this.setColor.bind(this)}
					barWidth={this.state.width}
					sliderSize={this.state.width * .16}
					color={this.state.color}/>
			</div>
		)
	}
	setColor(color) {
		window.color = color;
		this.props.setColor(color[this.props.colorType || "rgb"]().string());
		this.setState({color});
	}
}

const styles = StyleSheet.create({
	colorPicker: {
		width: "100%",
		position: "relative",
		display: "flex",
		alignItems: "center",
	}
});
