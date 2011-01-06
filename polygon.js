  MAX_POLYGONS_PER_IMAGE = 25;
  IMG_HEIGHT = 0;
  IMG_WIDTH = 0;

  function Vertex(x,y) {
    this.x = x;
    this.y = y;
  }

  function Polygon() {
    this.vertices = [];
    this.rgba = '';
    this.add = function(vertex) {this.vertices.push(vertex)}
  }

  function ImageBuffer() {
    this.polygons = [];
    this.fitness = 0;
    this.add = function(polygon) {this.polygons.push(polygon)}
  }

  function generateVertex() {
    return new Vertex(rand(IMG_WIDTH),rand(IMG_HEIGHT));
  }

  function generatePolygon() {
    var polygon = new Polygon();
    polygon.rgba = 'rgba(' + rand(255) + ',' + rand(255) + ',' +
                             rand(255) + ',' + Math.random() + ')';

    var numVertices = rand(7) + 3; // random 3 to 10 vertices
    for (var i = 0;i < numVertices;i++) {
        polygon.add(generateVertex());
    }
    
    return polygon;
  }

  function generateImage() {
    var image = new ImageBuffer();
    for (var i = 0;i < MAX_POLYGONS_PER_IMAGE;i++) {
      //log('add poly');
      image.add(generatePolygon());
    }
    return image;
  }

  function drawSinglePolygon(polygon, context) {
    context.fillStyle = polygon.rgba;
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo();

    var sz = polygon.vertices.length;
    for (var i = 0;i < sz;i++) {
      context.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
    }

    context.fill();
    context.closePath();
  }

  function drawBufferedImage(image,context) {
    for (var i = 0;i < MAX_POLYGONS_PER_IMAGE;i++) {
      drawSinglePolygon(image.polygons[i],context);
    }
  }




