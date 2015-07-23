// TODO
// -Set initials values of sliders
// -Buttons to turn on/off
// -Buttons to choose colors

var sliders = {"red": ["[this.value,-1,-1,-1]",0], "green": ["[-1,this.value,-1,-1]",1], "blue":["[-1,-1,this.value,-1]",2], "brightness": ["[-1,-1,-1,this.value]",3]};
//var colors = $.getJSON("/current_color");
//console.log(colors);


// on génère le tableau des sliders
function gen_sliders(){
    var table = $('<table></table>', {
        id: "sliders_table"
    });
    for(var slider in sliders){
        var row = $('<tr></tr>');

        var cell_1 = $('<td> </td>',{
            class: "name_cell"
        });
        cell_1.append(slider);

        //var to_append = '<input type="range" id="'+slider+'" min="0" max="100" step="1" value="0" onChange="webiopi().callMacro("update", '+sliders[slider]+', update_sliders);">'
        var cell_2 = $('<td></td>')
        cell_2.append($('<input/>', {
            type: "range",
            id: "slider_"+slider,
            min: "0",
            max: "100",
            step: "1",
            value: "0",
            onChange: 'webiopi().callMacro("update", '+sliders[slider][0]+', update_sliders)',
            onfocus : "this.blur();"
        }));

        var cell_3 = $('<td></td>',{
            id : "percent_"+slider
        });

        row.append(cell_1).append(cell_2).append(cell_3);
        table.append(row);
    }
    $('#sliders_space_holder').append(table);
}

function gen_table(data){
    var table = $('<table></table>', {
        id: "button_table"
    });
    for(var id = 0; id < data.length; id ++){
        var row = $('<tr></tr>');
        for(var button in data[id]){
            var cell = $('<td> </td>');
            if( data[id][button]["macro"] === undefined){
                cell.append($('<input/>', {
                    class:   "macro_button",
                    type: "button",
                    //style:   'background: -moz-radial-gradient(50% 30%, circle, '+button+', #888)',
                    style:   "background: "+button,
                    onclick: 'webiopi().callMacro("update", ' +  data[id][button]["color"] + ', update_sliders)',
                    onfocus : "this.blur();"
                }))
            } else {
                cell.append($('<input />', {
                    class:   "macro_button",
                    type:    "button",
                    //style:   'background: -moz-radial-gradient(50% 30%, circle, '+button+', #888)',
                    style:   "background: "+button,
                    onclick: 'webiopi().callMacro('+ data[id][button]["macro"] + ', update_sliders)',
                    onfocus: "this.blur();"
                }).append($('<div />',{
                    class:   "macro_style"
                })))
            };
            row.append(cell);
        };
        table.append(row);
    };
    $('#table_space_holder').append(table)
}

function set_color(color){
  switch(color){
    case "white":
      webiopi().callMacro("update", [100,100,100,-1],update_sliders);
      break;

    case "red":
        webiopi().callMacro("update", [100,0,0,-1],update_sliders);
      break;

    case "natural_white":
      webiopi().callMacro("update", [100,100,60,-1],update_sliders);
      break;

    case "night":
      webiopi().callMacro("update", [30,0,0,1],update_sliders);
      break;

    case "black":
      webiopi().callMacro("update", [-1,-1,-1,0],update_sliders);
      break;
  }
}

function update_sliders(macro, args, data){
    data = jQuery.parseJSON(data);
    console.log(macro + " called with " + args + " returned with " + data);
    for (slider in sliders){
        $('#slider_'+slider).val(data[sliders[slider][1]]);
        $('#percent_'+slider).text(data[sliders[slider][1]]+' %');
    }
    // var slider = document.getElementById(color);
    // var result = document.getElementById('result_'+color);
    // slider.value=num;
    // result.innerHTML = num+"%";
    // colors[color]=num;
}
