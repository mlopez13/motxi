
class CanvasRenderer {
	
	constructor(w, h) {
		const canvas = document.createElement("canvas");
		canvas.style = "position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; border: solid black; background-color: black";
		this.w = canvas.width = w;
		this.h = canvas.height = h;
		this.view = canvas;
		this.ctx = canvas.getContext("2d");
		this.ctx.textBaseline = "top";
	}
	
	render(container, clear = true) {
		const {ctx} = this;
		
		// RENDER RECURSIVE internal function.
		
		function renderRec(container) {
			
			if (container.visible === false || container.alpha === 0) {
				return;
			}
			
			if (container.alpha < 1) {
				ctx.save();
				ctx.globalAlpha = container.alpha;
			}
			
			container.children.forEach(child => {
				
				// (0) Check if visible.
				if (child.visible == false) {
					return;
				}
				
				// (1) Draw child.
				ctx.save();
				
				if (child.pos) {
					ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
				}
				if (child.rotation) {
					ctx.translate(child.pivot.x, child.pivot.y);
					ctx.rotate(child.rotation * Math.PI / 180);
					ctx.translate(- child.pivot.x, - child.pivot.y);
				}
				if (child.scale) {
					ctx.translate(child.pivot.x, child.pivot.y);
					ctx.scale(child.scale.x, child.scale.y);
					ctx.translate(- child.pivot.x, - child.pivot.y);
				}
				
				// TEXT.
				if (child.text) {
					const {font, fill, align} = child.style;
					const {strokeStyle, strokeWidth} = child.stroke;
					if (font) ctx.font = font;
					if (fill) ctx.fillStyle = fill;
					if (align) ctx.textAlign = align;
					ctx.fillText(child.text, 0, 0);
					if (strokeWidth !== 0) {
						ctx.strokeStyle = strokeStyle;
						ctx.lineWidth = strokeWidth;
						ctx.strokeText(child.text, 0, 0);
						ctx.stroke();
					}
				}
				
				// TEXTURE.
				else if (child.texture) {
					const img = child.texture.img;
					if (child.tileW) {
						ctx.drawImage(
							img,
							child.frame.x*child.tileW, // Source x.
							child.frame.y*child.tileH, // Source y.
							child.tileW, child.tileH, // Width and height.
							0, 0, // Destination x and y.
							child.tileW, child.tileH // Destination w and h.
						);
					} else {
						ctx.drawImage(img, 0, 0);
					}
				}
				
				// RECTANGLE.
				else if (child.fillRectangle) {
					const {w, h} = child;
					ctx.fillStyle = child.fillRectangle;
					ctx.fillRect(0, 0, w, h);
				}
				
				// (2) Apply renderRec if child has children.
				if (child.children) {
					renderRec(child);
				}
				ctx.restore();
				
			});
			
			if (container.alpha < 1) {
				ctx.restore();
			}
			
		}
		
		if (clear) {
			ctx.clearRect(0, 0, this.w, this.h);
		}
		
		// Start render recursive over all children in container.
		renderRec(container);
	}
}

export default CanvasRenderer;
