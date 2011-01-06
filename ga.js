function rand(max) {
    return Math.floor(Math.random() * (max + 1))
}

function mate(image1, image2) {
    var image = new ImageBuffer();
    for (var i = 0;i < MAX_POLYGONS_PER_IMAGE;i++) {
        if (Math.random() < .25) {
            image.add(generatePolygon());
        }
        else {
            if (rand(1) == 1) {
                image.add(image1.polygons[i]);
            }
            else {
                image.add(image2.polygons[i]);
            }
        }
    }
    return image;
}

function fitness(pixBuf1, pixBuf2) {
    var fitness = 0;
    // TODO: fixup backwards loop
    for (var y = 0;y < IMG_HEIGHT;y++) {
        for (var x = 0;x < IMG_WIDTH;x = x+4) {
            for (var z = 0;z < 4;z++) {
                if (z == 3) {
                    continue;
                } // skip alpha bit
                var idx = (IMG_HEIGHT * y) + (x + z);
                fitness += Math.abs(pixBuf1[idx] - pixBuf2[idx]);
            }
        }
    }
    return fitness;
}

function seedPopulation(size, context, pixBuf) {
    var seed = [size];
    for (var i = 0;i < size;i++) {
        seed[i] = generateImage();
    }

    computeFitness(seed, context, pixBuf);
    return seed;
}

function sortByFitness(population) {
    population.sort(function(img1,img2){
        return img1.fitness - img2.fitness
    });
}

function computeFitness(population, context, pixBuf) {
    var sz = population.length;
    for(var i = 0;i < sz;i++) {
        var image = population[i];
        // TODO: can this be drawn to a backbuffer?
        drawBufferedImage(image, context);
        var renderedPixBuf = context.getImageData(0,0,IMG_WIDTH,IMG_HEIGHT).data;
        image.fitness = fitness(pixBuf, renderedPixBuf);
        context.clearRect(0,0,IMG_WIDTH,IMG_HEIGHT);
    }
}

function bestParent(candidate1, candidate2) {
    return candidate1.fitness < candidate2.fitness ? candidate1 : candidate2;
}

function replicate(population, context, pixBuf) {
    var nextGen = [];
    var sz = population.length;
    for(var i = 0;i < population.length / 2;i++) {
        var parent1 = bestParent(population[rand(sz - 1)],population[rand(sz - 1)]);
        var parent2 = bestParent(population[rand(sz - 1)],population[rand(sz - 1)]);

        // create two children
        for (var j = 0;j < 2;j++) {
            nextGen.push(mate(parent1,parent2));
        }
    }

    computeFitness(nextGen, context, pixBuf);
    sortByFitness(nextGen);
    return nextGen;
}

var logEpoch = new Date().getTime();
function log(msg) {
    var txt = document.getElementById('console').innerHTML;
    var logTime = new Date().getTime();
    document.getElementById('console').innerHTML = '[' + (logTime - logEpoch) + ']: ' +
    msg + '<br>' + txt;
}

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


