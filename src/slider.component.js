import { css, StyleSheet } from 'aphrodite/no-important';
import { h, Component } from 'preact';
import { colorToPosition } from './colorpicker.helper.js';
import Color from 'color';

export default class ColorSlider extends Component {
	constructor() {
		super();
		this.mousemove = e => {
			const hue = Math.floor(((e.x - this.props.barStart) / this.props.barWidth) * 360);
			this.props.setColor(Color(`hsl(${hue >= 360 ? 359 : hue < 0 ? 0 : hue}, 90%, 50%)`));
		}
		this.mouseup = e => {
			window.removeEventListener('mousemove', this.mousemove);
			window.removeEventListener('mouseup', this.mouseup);
			this.setState({
				dragging: false,
			})
		}
		this.state = {
			dragging: false,
		}
	}
	render(props, state) {
		return (
			<div
				onMouseDown={e => {
					this.xStart = e.x;
					this.setState({
						dragging: true,
					})
					window.addEventListener('mousemove', this.mousemove);
					window.addEventListener('mouseup', this.mouseup);
				}}
				style={{
					height: `${props.sliderSize}px`,
					width: `${props.sliderSize}px`,
					left: `calc(${colorToPosition(props.color)}% - ${props.sliderSize / 2}px)`,
					background: `${props.color.hsl().string()}`,
				}}
				class={`${css(styles.slider)} ${css(this.state.dragging ? styles.grabbing : styles.grab)}`}>
			</div>
		)
	}
}

export const styles = StyleSheet.create({
	slider: {
		borderRadius: "50%",
		position: "absolute",
		boxShadow: "-2px 2px 3px rgba(0, 0, 0, 0.2)",
	},
	grab: {
		cursor: "grab",
	},
	grabbing: {
		cursor: "grabbing",
	}
});
