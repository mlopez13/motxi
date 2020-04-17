
class Text {
	
	constructor(text = "", style = {}, stroke = {strokeStyle: "#000000", strokeWidth: 0}) {
		
		this.pos = {x: 0, y: 0};
		this.pivot = {x: 0, y: 0};
		
		this.text = text;
		this.style = style;
		this.stroke = stroke;
		
	}
	
}

export default Text;
