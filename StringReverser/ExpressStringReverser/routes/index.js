
/*
 * GET home page.
 */



exports.index = function (req, res)
{

    
    var vm = {
        title: "String Reverser", 
        foo: "bar"
    };
res.render('index', vm);
};

