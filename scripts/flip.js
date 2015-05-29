var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    flipButton = document.getElementById('flipButton'),
    img = new Image(),
    width = 500,
    height = 328;

function flipImage(image, ctx, flipH, flipV) {
    var scaleH = flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
        scaleV = flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
        posX = flipH ? width * -1 : 0, // Set x position to -100% if flip horizontal 
        posY = flipV ? height * -1 : 0; // Set y position to -100% if flip vertical
    
    ctx.save(); // Save the current state
    ctx.scale(scaleH, scaleV); // Set scale to flip the image
    ctx.drawImage(img, posX, posY, width, height); // draw the image
    ctx.restore(); // Restore the last saved state
};

function flipNinjas() {
    var flipH = document.getElementById('horizontalCheckbox').checked,
        flipV = document.getElementById('verticalCheckbox').checked;
    
    flipImage(img, ctx, flipH, flipV);
    
    return false;
}

flipButton.onclick = flipNinjas;
img.onload = flipNinjas;

img.src = 'http://3.bp.blogspot.com/-h_hVjcMqx8Q/TdSbVhT18sI/AAAAAAAAACQ/y-egUR0AtRM/s1600/ninja_true-ninjas.gif';