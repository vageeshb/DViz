'use strict';

angular.module('dvizApp')
  .directive('weightPolygon', function () {
    return {
      templateUrl: 'components/weight-polygon/weight-polygon.html',
      restrict: 'EA',
      scope: {
        weight: '='
      },
      link: function (scope, element, attrs) {
        var boxSize = 250
        var minLengthToCenter = 50
        var max = boxSize / 2;
        var margin = {top: 25, right: 25, bottom: 30, left: 25};
        var labelEnum = ["European", "American", "Medeterranian", "Asian", "Italian", "Misc"];
        
        var weightEuropean = 0
        var weightUs = 0
        var weightMedeterranian = 0
        var weightAsian = 0
        var weightItalian = 0
        var weightServices = 0
        
        function updateWeights() {
          var europeanX = parseFloat(d3.select("#european").attr("cx"))
          var europeanY = parseFloat(d3.select("#european").attr("cy"))
          var minEuropeanX = boxSize / 2 + minLengthToCenter * Math.cos(Math.PI/2)
          var minEuropeanY = boxSize / 2 + minLengthToCenter * Math.sin(Math.PI/2)
          var europeanDist = Math.sqrt((europeanX - minEuropeanX) * (europeanX - minEuropeanX) + (europeanY - minEuropeanY) * (europeanY - minEuropeanY))
          
          var usX = parseFloat(d3.select("#us").attr("cx"))
          var usY = parseFloat(d3.select("#us").attr("cy"))
          var minUsX = boxSize / 2 + minLengthToCenter * Math.cos(Math.PI/6)
          var minUsY = boxSize / 2 + minLengthToCenter * Math.sin(Math.PI/6)
          var usDist = Math.sqrt((usX - minUsX) * (usX - minUsX) + (usY - minUsY) * (usY - minUsY))
          
          var medeterranianX = parseFloat(d3.select("#medeterranian").attr("cx"))
          var medeterranianY = parseFloat(d3.select("#medeterranian").attr("cy"))
          var minMedeterranianX = boxSize / 2 + minLengthToCenter * Math.cos(11* Math.PI/6)
          var minMedeterranianY = boxSize / 2 + minLengthToCenter * Math.sin(11* Math.PI/6)
          var medeterranianDist = Math.sqrt((medeterranianX - minMedeterranianX) * (medeterranianX - minMedeterranianX) + (medeterranianY - minMedeterranianY) * (medeterranianY - minMedeterranianY))
        
          var asianX = parseFloat(d3.select("#asian").attr("cx"))
          var asianY = parseFloat(d3.select("#asian").attr("cy"))
          var minAsianX = boxSize / 2 + minLengthToCenter * Math.cos(3 * Math.PI/2)
          var minAsianY = boxSize / 2 + minLengthToCenter * Math.sin(3 * Math.PI/2)
          var asianDist = Math.sqrt((asianX - minAsianX) * (asianX - minAsianX) + (asianY - minAsianY) * (asianY - minAsianY))
          
          var italianX = parseFloat(d3.select("#italian").attr("cx"))
          var italianY = parseFloat(d3.select("#italian").attr("cy"))
          var minIitalianX = boxSize / 2 + minLengthToCenter * Math.cos(7 * Math.PI/6)
          var minIitalianY = boxSize / 2 + minLengthToCenter * Math.sin(7 * Math.PI/6)
          var italianDist = Math.sqrt((italianX - minIitalianX) * (italianX - minIitalianX) + (italianY - minIitalianY) * (italianY - minIitalianY))
          
          var servicesX = parseFloat(d3.select("#services").attr("cx"))
          var servicesY = parseFloat(d3.select("#services").attr("cy"))
          var minServicesX = boxSize / 2 + minLengthToCenter * Math.cos(5 * Math.PI/6)
          var minServicesY = boxSize / 2 + minLengthToCenter * Math.sin(5 * Math.PI/6)
          var servicesDist = Math.sqrt((servicesX - minServicesX) * (servicesX - minServicesX) + (servicesY - minServicesY) * (servicesY - minServicesY))
          
          scope.weight = {
            european: europeanDist / (max - minLengthToCenter),
            american: usDist / (max - minLengthToCenter),
            medeterranian: medeterranianDist / (max - minLengthToCenter),
            asian: asianDist / (max - minLengthToCenter),
            italian: italianDist / (max - minLengthToCenter),
            services: servicesDist / (max - minLengthToCenter)
          };
          scope.$apply();
        }

        var svgContainer = d3.select("#weight-map")
          .append("svg")
          .attr("width", boxSize + margin.left + margin.right + 20)
          .attr("height", boxSize + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + (margin.top + 10) + ")");
          
        var limits = {
          e: {
            min: boxSize/2  + minLengthToCenter,
            max: boxSize/2  + max
          }
        };

        var drag = d3.behavior.drag()
              .on("drag", function(d,i) {
                var newCx = 0
                var newCy = 0

                d3.select(this)
                  .style('stroke', 'white')
                  .style('stroke-width', '3');

                if (d3.select(this).attr("id") == "european") {
                  newCx = boxSize/2
                  newCy = parseFloat(d3.select(this).attr("cy")) + parseFloat(d3.event.dy)

                  newCy = (newCy < limits.e.min) ? limits.e.min : 
                            (newCy > limits.e.max) ? limits.e.max : newCy;

                  d3.select("#EuropeUSLine").attr("x1", newCx)
                  d3.select("#EuropeUSLine").attr("y1", newCy)
                  d3.select("#ServicesEuropeanLine").attr("x2", newCx)
                  d3.select("#ServicesEuropeanLine").attr("y2", newCy)
                } else if (d3.select(this).attr("id") == "us") {
                  newCx = parseFloat(d3.select(this).attr("cx")) + parseFloat(d3.event.dx)
                  newCy = boxSize / 2 + (newCx - boxSize/2) * Math.tan(Math.PI/6)
                  if(newCy < boxSize/2  + minLengthToCenter * Math.sin(Math.PI/6))
                  { 
                    newCy = boxSize/2  + minLengthToCenter * Math.sin(Math.PI/6)
                    newCx = boxSize / 2 + minLengthToCenter * Math.cos(Math.PI/6)
                  }

                  if(newCy > boxSize/2 + max * Math.sin(Math.PI/6)) {
                    newCy = boxSize/2  + max * Math.sin(Math.PI/6)
                    newCx = boxSize / 2 + max * Math.cos(Math.PI/6)
                  }

                  d3.select("#USMedeterraneanLine").attr("x1", newCx)
                  d3.select("#USMedeterraneanLine").attr("y1", newCy)
                  d3.select("#EuropeUSLine").attr("x2", newCx)
                  d3.select("#EuropeUSLine").attr("y2", newCy)
                } else if (d3.select(this).attr("id") == "medeterranian") {
                  newCx = parseFloat(d3.select(this).attr("cx")) + parseFloat(d3.event.dx)
                  newCy = boxSize / 2 + (newCx - boxSize/2) * Math.tan(11*Math.PI/6)
                  if(newCy > boxSize/2  + minLengthToCenter * Math.sin(11*Math.PI/6))
                  { 
                    newCy = boxSize/2  + minLengthToCenter * Math.sin(11*Math.PI/6)
                    newCx = boxSize/2 + minLengthToCenter * Math.cos(11*Math.PI/6)
                  }
                  if(newCy < boxSize/2 + max * Math.sin(11*Math.PI/6))
                  { 
                    newCy = boxSize/2 + max * Math.sin(11*Math.PI/6)
                    newCx = boxSize/2 + max * Math.cos(11*Math.PI/6)
                  }
                  d3.select("#MedeterranianAsianLine").attr("x1", newCx)
                  d3.select("#MedeterranianAsianLine").attr("y1", newCy)
                  d3.select("#USMedeterraneanLine").attr("x2", newCx)
                  d3.select("#USMedeterraneanLine").attr("y2", newCy)
                } else if (d3.select(this).attr("id") == "asian") {
                  newCx = boxSize/2
                  newCy = parseFloat(d3.select(this).attr("cy")) + parseFloat(d3.event.dy)
                  if(newCy > boxSize/2  + minLengthToCenter * Math.sin(3*Math.PI/2))
                    newCy = boxSize/2  + minLengthToCenter * Math.sin(3*Math.PI/2)

                  if(newCy < boxSize/2 - max)
                    newCy = boxSize/2 - max;

                  d3.select("#AsianItalianLine").attr("x1", newCx)
                  d3.select("#AsianItalianLine").attr("y1", newCy)
                  d3.select("#MedeterranianAsianLine").attr("x2", newCx)
                  d3.select("#MedeterranianAsianLine").attr("y2", newCy)
                } else if(d3.select(this).attr("id") == "italian") {
                  newCx = parseFloat(d3.select(this).attr("cx")) + parseFloat(d3.event.dx)
                  newCy = boxSize / 2 + (newCx - boxSize/2) * Math.tan(7*Math.PI/6)
                  if(newCy > boxSize/2  + minLengthToCenter * Math.sin(7*Math.PI/6))
                  { 
                    newCy = boxSize/2  + minLengthToCenter * Math.sin(7*Math.PI/6)
                    newCx = boxSize/2 + minLengthToCenter * Math.cos(7*Math.PI/6)
                  }
                  if(newCy < boxSize/2  + max * Math.sin(7*Math.PI/6))
                  { 
                    newCy = boxSize/2  + max * Math.sin(7*Math.PI/6)
                    newCx = boxSize/2 + max * Math.cos(7*Math.PI/6)
                  }
                  d3.select("#ItalianServicesLine").attr("x1", newCx)
                  d3.select("#ItalianServicesLine").attr("y1", newCy)
                  d3.select("#AsianItalianLine").attr("x2", newCx)
                  d3.select("#AsianItalianLine").attr("y2", newCy)
                } else if (d3.select(this).attr("id") == "services") {
                  newCx = parseFloat(d3.select(this).attr("cx")) + parseFloat(d3.event.dx)
                  newCy = boxSize / 2 + (newCx - boxSize/2) * Math.tan(5*Math.PI/6)
                  if(newCy < boxSize/2  + minLengthToCenter * Math.sin(5*Math.PI/6))
                  { 
                    newCy = boxSize/2  + minLengthToCenter * Math.sin(5*Math.PI/6)
                    newCx = boxSize/2 + minLengthToCenter * Math.cos(5*Math.PI/6)
                  }
                  if(newCy > boxSize/2  + max * Math.sin(5*Math.PI/6))
                  { 
                    newCy = boxSize/2 + max * Math.sin(5*Math.PI/6)
                    newCx = boxSize/2 + max * Math.cos(5*Math.PI/6)
                  }
                  d3.select("#ServicesEuropeanLine").attr("x1", newCx)
                  d3.select("#ServicesEuropeanLine").attr("y1", newCy)
                  d3.select("#ItalianServicesLine").attr("x2", newCx)
                  d3.select("#ItalianServicesLine").attr("y2", newCy)
                }
                d3.select(this).attr("cx", newCx)
                d3.select(this).attr("cy", newCy)
                
                updateWeights();
              })
              .on("dragend", function(d) {
                d3.select(this)
                  .style('stroke', 'white')
                  .style('stroke-width', '0');
              });


        var radiusOfDots = 10;

        var cX = boxSize / 2,
        cY = boxSize / 2,

        eX = boxSize / 2 + minLengthToCenter * Math.cos(Math.PI/2),
        eY = boxSize / 2 + minLengthToCenter * Math.sin(Math.PI/2),

        uX = boxSize / 2 + minLengthToCenter * Math.cos(Math.PI/6),
        uY = boxSize / 2 + minLengthToCenter * Math.sin(Math.PI/6),

        mX = boxSize / 2 + minLengthToCenter * Math.cos(11* Math.PI/6),
        mY = boxSize / 2 + minLengthToCenter * Math.sin(11* Math.PI/6),

        aX = boxSize / 2 + minLengthToCenter * Math.cos(3 * Math.PI/2),
        aY = boxSize / 2 + minLengthToCenter * Math.sin(3 * Math.PI/2),

        iX = boxSize / 2 + minLengthToCenter * Math.cos(7 * Math.PI/6),
        iY = boxSize / 2 + minLengthToCenter * Math.sin(7 * Math.PI/6),

        sX = boxSize / 2 + minLengthToCenter * Math.cos(5 * Math.PI/6),
        sY = boxSize / 2 + minLengthToCenter * Math.sin(5 * Math.PI/6);

        drawPolygon(boxSize/2, '#e74c3c', 0.4);
        drawPolygon(boxSize/2.5, '#e67e22', 0.4);
        drawPolygon(boxSize/3.25, '#2ecc71', 0.4);
        drawPolygon(minLengthToCenter, 'white', 0.7);

        drawPolygon(boxSize/2, '#e74c3c', 0.4, true);
        drawPolygon(boxSize/1.8, null, 0.4, false, true);

        appendLine(svgContainer, "EuropeUSLine", eX, eY, uX, uY);
        appendLine(svgContainer,"USMedeterraneanLine", uX, uY, mX, mY);
        appendLine(svgContainer,"MedeterranianAsianLine", mX, mY, aX, aY);
        appendLine(svgContainer, "AsianItalianLine", aX, aY, iX, iY);
        appendLine(svgContainer, "ItalianServicesLine", iX, iY, sX, sY);
        appendLine(svgContainer, "ServicesEuropeanLine", sX, sY, eX, eY);

        appendCircle(svgContainer, "european", eX, eY, radiusOfDots, "purple", drag);
        appendCircle(svgContainer, "us", uX, uY, radiusOfDots, "red", drag);
        appendCircle(svgContainer, "medeterranian", mX, mY, radiusOfDots, "blue", drag);
        appendCircle(svgContainer, "asian", aX, aY, radiusOfDots, "orange", drag);
        appendCircle(svgContainer, "italian", iX, iY, radiusOfDots, "green", drag);
        appendCircle(svgContainer, "services", sX, sY, radiusOfDots, "gray", drag);

        function drawPolygon(val, color, op, addAxis, addLabel) {
          var points = []
          points.push(boxSize / 2 + val * Math.cos(Math.PI/2));
          points.push(boxSize / 2 + val * Math.sin(Math.PI/2));
          points.push(boxSize / 2 + val * Math.cos(Math.PI/6));
          points.push(boxSize / 2 + val * Math.sin(Math.PI/6));
          points.push(boxSize / 2 + val * Math.cos(11* Math.PI/6));
          points.push(boxSize / 2 + val * Math.sin(11* Math.PI/6));

          points.push(boxSize / 2 + val * Math.cos(3 * Math.PI/2));
          points.push(boxSize / 2 + val * Math.sin(3 * Math.PI/2));

          points.push(boxSize / 2 + val * Math.cos(7 * Math.PI/6));
          points.push(boxSize / 2 + val * Math.sin(7 * Math.PI/6));

          points.push(boxSize / 2 + val * Math.cos(5 * Math.PI/6));
          points.push(boxSize / 2 + val * Math.sin(5 * Math.PI/6));

          if(addAxis == true)
            drawAxis(cX, cY, points);
          else if(addLabel == true) {
            for (var i = 0, j = 0; i < points.length; i+=2, j++) {
              appendText(svgContainer, points[i], points[i+1], labelEnum[j]);
            };
          }
          else
            appendPolygon(svgContainer, color, op, points);
        }

        function drawAxis(cX, cY, points) {
          for (var i = 0; i < points.length; i+=2) {
            appendDashedLine(svgContainer, null, cX, cY, points[i], points[i+1]);
          };
        }

        function appendCircle(container, id, x, y, r, color, fn) {
          container.append("circle")
            .attr("id", id)
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", r)
            .attr("fill", color)
            .on('mouseover', function(d) { 
              d3.select(this)
                .style("stroke", "white")
                .style("stroke-width", "3")
                .style({opacity:'0.8'}) 
            })
            .on('mouseout', function(d) { 
              d3.select(this)
                .style("stroke-width", "0")
                .style({opacity:'1.0',}) 
            })
            .call(fn);
        }

        function appendPolygon (container, color, op, points) {
          container.append("polygon")       
            .style("stroke", "black")
            .style("stroke-dasharray", ("3, 3"))
            .style("fill", color)
            .style("opacity", op)      // set the element opacity   
            .attr("points", points);  // x,y points 
        }

        function appendDashedLine (container, id, x1, y1, x2, y2) {
          container.append("line")
                .attr("id",id)
                .style("stroke-dasharray", ("3, 3"))
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x2)
                .attr("y2", y2)
                .attr("stroke", "black");
        }

        function appendLine (container, id, x1, y1, x2, y2) {
          container.append("line")
                .attr("id",id)
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x2)
                .attr("y2", y2)
                .attr("stroke", "black");
        }

        function appendText (container, x, y, text) {
          container.append("text")    
                    .attr("x", x )
                    .attr("y",  y )
                    .style("text-anchor", "middle")
                    .text(text);
        }
      }
    };
  });