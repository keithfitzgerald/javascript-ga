  function rand(max) {
    return Math.floor(Math.random() * (max + 1))
  }

  function mate(image1, image2) {
    var image = new BufferedImage();
    for (var i = 0;i < 25;i++) {
      image.add(image1.polygons[i]);
    }

    for (var i = 0;i < 25;i++) {
      image.add(image2.polygons[i]);
    }
    
    return image;
  }

  function fitness(pixBuf1, pixBuf2, width, height) {
    var fitness = 0;
    for (var y = 0;y < height;y++) {
      for (var x = 0;x < width;x++) {
         for (var a = 0;a < 4;a++) {
           var idx = (height * y) + (x + a);
           fitness += Math.abs(pixBuf1[idx] - pixBuf2[idx]);
         }
      }
    }
    return fitness;
  }

  function seedPopulation(size, context, pixBuf) {
    var width = context.canvas.width;
    var height = context.canvas.height;
    var seed = [size];
    for (var i = 0;i < size;i++) {
      var image = generateImage(width,height);
      drawBufferedImage(image, context);
      var renderedPixBuf = context.getImageData(0,0,width,height).data;
      image.fitness = fitness(pixBuf,renderedPixBuf,width,height);
      seed[i] = image;
      context.clearRect(0,0,width,height);
    }
    
    seed.sort(function(img1,img2){return img1.fitness - img2.fitness});
    return seed;
  }

  function replicate(population, context, pixBuf) {
    var width = context.canvas.width;
    var height = context.canvas.height;
    var nextGen = [];
    for(var i = 0;i < 10;i++) {
        for (var j = 0;j < 10;j++) {
            // TODO: fix mating with self
            var image = mate(population[i],population[j]);
            drawBufferedImage(image);
            var renderedPixBuf = context.getImageData(0,0,width,height).data;
            image.fitness = fitness(pixBuf,renderedPixBuf);
            context.clearRect(0,0,width,height);
            nextGen.push(image);
        }
    }
    
    nextGen.sort(function(img1,img2){return img1.fitness - img2.fitness});
  }

  var logEpoch = new Date().getTime();
  function log(msg) {
      var txt = document.getElementById('console').innerHTML;
      var logTime = new Date().getTime();
      document.getElementById('console').innerHTML = '[' + (logTime - logEpoch) + ']: ' +
                                                     msg + '<br>' + txt;
  }


