var rect = {
    perimeter: (x,y) => (2*(x+y)),
    area: (x,y) => (x*y)
}

function solveRect(l, b){
    console.log('Solving for rectangle: ', l, b);

    if(l <=0 || b <= 0){
        console.log('VALUES INCORRECT')
    }else {
        console.log('The area of rectangle is: ', rect.area(l,b));
        console.log('The perimeter of rectangle is: ', rect.perimeter(l,b));

    }
}

//execute
solveRect(2,3);
solveRect(-2,3);
solveRect(2,-3);
solveRect(223,3655767);
solveRect(0,3);

