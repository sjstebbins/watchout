// start slingin' some d3 here.

//initialize settings so as to be able to adjust later
var settings = {
  w: window.innerWidth,
  h: window.innerHeight,
  n: 30,
  interval: 1000,
  r: 10
};


var rand = function(x){return(Math.random()*x)};

var drag = d3.behavior.drag()
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })


var body = d3.select('body');

var svgSelection = body.append("svg")
                          .attr("width", settings.w - 100)
                          .attr("height", settings.h - 100);

var enemies = svgSelection.selectAll('enemies')
                    .data(d3.range(settings.n))
                    .enter()
                    .append("circle")
                    .attr("cx", function(){return rand(settings.w);})
                    .attr("cy", function(){return rand(settings.h);})
                    .attr("r", 10)
                    .style('fill', 'red');

var player = svgSelection.selectAll('player')
                    .data([1])
                    .enter()
                    .append("circle")
                    .attr("cx", function(){return settings.w / 2 ;})
                    .attr("cy", function(){return settings.h / 2;})
                    .attr("r", 10)
                    .style('fill', 'black')
                    .call(drag);



//relocation function
var relocation = function(){
  enemies.transition()
        .duration(settings.interval)
        //   .delay(function(d, i) { return i /  2 * settings.interval; })
        .attr("cx", function(){return rand(settings.w - 100);})
        .attr("cy", function(){return rand(settings.h - 150);});
};

setInterval(relocation, 1500);

var collisions = 0;
var collisionCheck = function(){

    enemies.each(function(){
      var enemy = d3.select(this);


       if (Math.abs(enemy.attr("cx") - player.attr("cx")) <= settings.r  && Math.abs(enemy.attr("cy") - player.attr("cy")) <= settings.r ) {
          // console.log("Collision Math Passed");
          // console.log(Math.abs(enemy.attr("cx") - player.attr("cx")));
          // console.log(Math.abs(enemy.attr("cy") - player.attr("cy")));

          collisions+=1;
          var collisionCoun = d3.select('.collisions span')
                       .text(collisions);
          if (score > bestscore) {
            bestscore = score;
          }
          var bestscoreCount = d3.select('.high span')
                       .text(bestscore);
          score = 0;

       }
     });
}

d3.timer(collisionCheck);


//score
var score = 0;
var bestscore = 0;
var scoreIncrement = function () {
  score += 1;
  var currentScore = d3.select('.current span')
                       .text(score);
}
setInterval(scoreIncrement, 100);
