  MAX_POLYGONS_PER_IMAGE = 50;

  function Vertex(x,y) {
    this.x = x;
    this.y = y;
  }

  // TODO: this should take N vertices
  function Polygon() {
    this.v1;
    this.v2;
    this.v3;
    this.rgba = '';
  }

  function ImageBuffer() {
    this.polygons = [];
    this.fitness = 0;
    this.add = function(polygon) {this.polygons.push(polygon)}
  }

  function generateVertex(maxWidth,maxHeight) {
    return new Vertex(rand(maxWidth),rand(maxHeight));
  }

  function generatePolygon(maxWidth,maxHeight) {
    var polygon = new Polygon();
    polygon.rgba = 'rgba(' + rand(255) + ',' + rand(255) + ',' +
                             rand(255) + ',' + Math.random() + ')';
    polygon.v1 = generateVertex(maxWidth,maxHeight);
    polygon.v2 = generateVertex(maxWidth,maxHeight);
    polygon.v3 = generateVertex(maxWidth,maxHeight);

    //log('polygon: ' + polygon.v3);
    return polygon;
  }

  function generateImage(maxWidth,maxHeight) {
    var image = new ImageBuffer();
    for (var i = 0;i < MAX_POLYGONS_PER_IMAGE;i++) {
      //log('add poly');
      image.add(generatePolygon(maxWidth,maxHeight));
    }
    return image;
  }

  function drawSinglePolygon(polygon, context) {
    context.fillStyle = polygon.rgba;
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo();
    context.lineTo(polygon.v1.x, polygon.v1.y);
    context.lineTo(polygon.v2.x, polygon.v2.y);
    context.lineTo(polygon.v3.x, polygon.v3.y);

    context.fill();
    context.closePath();
  }

  function drawBufferedImage(image,context) {
    for (var i = 0;i < MAX_POLYGONS_PER_IMAGE;i++) {
      drawSinglePolygon(image.polygons[i],context);
    }
  }




