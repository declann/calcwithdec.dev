import define1 from "./8a36f9f2f68dd1d1@36.js";

function _1(md){return(
md`# calculang tools ✨ (bad/drafty version)

Drafty tools which I will release in other places (individually and cleaner) in weeks ahead.

This is a notebook where I mess about and I thought about integrating things which works but in a messy way.`
)}

function _formulae_info(model,introspection){return(
Object.keys(model).map(d => Object.values(introspection.cul_functions).find(e => e.name == d && e.cul_scope_id == 0)).filter(d => d != undefined)
)}

function _formulae_info_inputs(formulae_info)
{
  var inputs = [];
  formulae_info.forEach(d => {
    inputs.push(d.inputs)
  })
  return [...new Set(inputs.flat())] //Object.keys(inputs);
}


function _input_domains_config(d3){return(
d3.csvParse(
`input,min,max,step,default0,default1,step_sens
age_in,20,70,10,30,60,10
age_0_in,20,50,5,25,40,5
annual_salary_0_in,10000,200000,100,50000,100000,30000
salary_inflation_rate_in,-0.05,0.10,0.01,0.05,0.04,0.03
empee_contribution_rate_in,0.00,0.30,0.01,0.05,0.1,0.05
unit_growth_rate_in,-0.02,0.10,0.01,0.05,0.05,0.02
retirement_age_in,25,90,1,66,60,5
fund_value_0_in,0,300000,1000,0,100000,50000
annual_salary_in,0,1000000,1000,50000,50000,50000
addl_credit_in,0,1,1,0,0,1
num_bars_in,0,20,1,10,10,5
container_height$_in,0,600,1,500,500,100
top_margin$_in,0,20,1,10,10,5
bottom_margin$_in,0,20,1,10,10,5
gap$_in,0,20,1,10,10,15
bar_height$_in,0,50,1,25,25,5
`, d => ({...d, min:+d.min,max:+d.max,step:+d.step_sens,default:+d.default}))
)}

function _5(md){return(
md`### *inputs:*`
)}

function _domains_(inputs){return(
{
  age_in: [60,61,62],
  age_0_in:[30,40,60,61,62], // one with multi allowed in cursor
  fund_value_0_in: [/*inputs.fund_value_0_in*/0,25000,50000,75000,100000],
  unit_growth_rate_in:[-0.01,0,0.05,0.06,0.07],
  retirement_age_in:[inputs.retirement_age_in],
  annual_salary_0_in:[inputs.annual_salary_0_in],
  salary_inflation_rate_in:[inputs.salary_inflation_rate_in-0.01,inputs.salary_inflation_rate_in,inputs.salary_inflation_rate_in+0.01],
  empee_contribution_rate_in:[inputs.empee_contribution_rate_in]
}
)}

function _domains(input_domains_config,_)
{
  var o = {};
  for (var i in input_domains_config) {
    var d = input_domains_config[i];
    o[d.input] = _.range(d.min, d.max, d.step).map(d => +d.toFixed(2))// input_domains_config[i];
  };
  return o
}


function _8(inputs){return(
inputs
)}

function _9(formula_inputs,y,$0)
{
  formula_inputs.forEach((d, i) => {
    y.value.insert(`selection_${d}_store`, [{unit: `concat_${i}_layer_0`, fields: [{"field":d,"channel":"x","type":"E"}]		, values:[$0.value[d]]}]).run(); // this is a lot of run calls !
  });
}


function _ooo(formulae_info_inputs,inputs)
{
  var o = {}
  formulae_info_inputs.forEach(d => {
    o[d] = [inputs[d]]
  })
  return o
}


function _cursor(formula_inputs,ooo){return(
Object({
  multi: formula_inputs[0],//'age_0_in',
  ...ooo
  /*age_in: [inputs.age_in], //
  age_0_in:[inputs.age_0_in], // one with multi allowed in cursor
  fund_value_0_in: [inputs.fund_value_0_in],
  unit_growth_rate_in:[inputs.unit_growth_rate_in],
  retirement_age_in:[inputs.retirement_age_in],
  annual_salary_0_in:[inputs.annual_salary_0_in],
  salary_inflation_rate_in:[inputs.salary_inflation_rate_in],
  empee_contribution_rate_in:[inputs.empee_contribution_rate_in]*/
})
)}

function _14(){return(
[10,20].indexOf(20)
)}

function _15(domains){return(
domains['age_in'].find(d => d == 60)
)}

function _cursorStepIndex(domains,cursor)
{
  var o = {}
  //o.age_in = domains['age_in'].find(d => d == cursor['age_in'][0])
  o.age_in = domains['age_in'].indexOf(cursor['age_in'][0])
  return o;
}


function _17(introspection){return(
introspection.cul_functions
)}

function _18(formulae_info){return(
formulae_info
)}

function _formula_select1(Inputs,formulae_info){return(
Inputs.select(/*["annual_premium", "annual_salary", "fund_value", "projected_fund_value"]*/formulae_info.map(d => d.name), {label: "Select one"})
)}

function _use_cursor_from_table(Inputs){return(
Inputs.checkbox(["?"], {label: "use_cursor_from_table", value: ["?"]})
)}

function _21(md){return(
md`has bug fixes vs orig

can do this for every formula at once if repeat X/col works with layers`
)}

function _inputs(formulae_info_inputs,input_domains_config,Inputs)
{
  var obj = {};
  //obj['age_in'] = Inputs.range([inputs.age_0_in-1, inputs.retirement_age_in], {step: 1, label:'age'});
  formulae_info_inputs/*.filter(d => d != pvt_y)*/.forEach(d => {
    //var rate = d.indexOf("rate") != -1
    var config = input_domains_config.find(e => e.input == d)
    obj[d] = Inputs.range([config.min, config.max], {step: config.step_sens, label: d.substr(0,d.length-3), value: config.default1})
  })
  return Inputs.form(obj)
}


function _23(md){return(
md`this will be an interactive way to browse a model, difficulty is in the mix of super- vs. subtly sensitive params`
)}

function _v(html,x){return(
html`
<div id='chart-container' style='position: relative;'>
  <div id='chart-div' style='overflow-x: scroll'>${x}</div>
</div>`
)}

function _x(vega,sensitivity_data){return(
vega({
  data: {name: 'projection'},
        transform: [{filter: "abs(datum.step) <= 3"}],

  encoding: {
    x: {field: 'step'},
    y: {field: 'value', type:'quantitative', scale: {zero:false}},
    
  },
  layer: [
    {
      mark: {type: 'line', size: 5, tooltip:true, opacity:0.5},
      encoding: {color: {field: 'sens', legend:null}}
    },
    {
      transform: [
        {
          "window": [{"op": "rank", "as": "rank"}],
          "sort": [{"field": "value", "order": "descending"}],
          "groupby": ["sens"]
        },
        {
          "window": [{"op": "rank", "as": "rankAll"}],
          "sort": [{"field": "value", "order": "descending"}],
        },
        {"filter": "datum.rank == 1"}
      ],
      "mark": {
        "type": "text",
        "tooltip": true,
        "limit": 200,
        "align": "right",
        "dx": -10,strokeWidth:2,
        "fontStyle": {"expr": "datum.rankAll % 2 == 1 ? 'bold' : ''"}
      },
      encoding: {text: {field:'annotation'},color: {field: 'sens', legend:null} }
    },
    {
      //transform: [{filter: "datum.sens=='empee_contribution_rate_in'"}],
      mark: {type: 'point', point: true, size: 100, tooltip:true, opacity:0.5},
      encoding: {color: {field: 'sens', legend:null},fill: {field: 'sens', legend:null}}
    }
  ],
  width: 500,
  height:500,
  datasets: {projection: [...sensitivity_data]}
})
)}

function _26(sensitivity_data){return(
sensitivity_data
)}

function _27(vega,sensitivity_data){return(
vega({ //make this useindept xscales optional.. example to do: how much sales to make to compensate for lower prices?
  data: {name: 'projection'},
  mark: {type: 'bar', tooltip:true},
        "resolve": {"scale": {"y": "independent"}},
  encoding: {
    x: {field: 'step'},
    y: {field: 'value', type:'quantitative'},
    detail: {field: 'sens'},
    //detail: {expr: 'datum[datum.sens]'},
    color: { condition: { test: "datum.step == 0", value: 'brown'}},
    row: {field: 'sens'},
  },
  width: 500,
  height:50,
  datasets: {projection: [...sensitivity_data]}
})
)}

function _28(vega,formula_inputs,sensitivity_data){return(
vega({
  data: {name: 'projection'},
    "resolve": {"scale": {"x": "independent"}},

  repeat: {layer: formula_inputs/*, row:["value", "v2"] breaks independent x scale*/},//["age_in", "age_0_in"]},//formula_inputs,
  spec: {
  mark: {type: 'line', tooltip:true},
  encoding: {
    //x: {field: 'step'}, 

    x: { field: { repeat: 'layer', type:'quantitative' , scale: {range:[-1,1]}}}, // will work if I move to offsets from cursor. Configurable step size and annotation step, done?? Still needs domain limits
    //y: {field: {repeat:'l2'}, type:'quantitative'},//'value', type:'quantitative'},
    y: {field:'value', type:'quantitative'},
    detail: {field: 'sens'},
    //detail: {expr: 'datum[datum.sens]'},
    color: { field:'sens'},
    //color: { condition: { test: "datum.step == 0", value: 'brown'}},
    //row: {field: 'sens'},
  }},
  width: 500,
  height:50,
  datasets: {projection: [...sensitivity_data]}
})
)}

function _y(facet2_custom,formula_inputs,formula_select1,data_part_1,data_part_2b,vega_interactive)
{ var spec_1 = Object.assign({}, JSON.parse(facet2_custom(formula_inputs,[formula_select1]))); spec_1.data = {values: [...data_part_1,...data_part_2b.flat()]}; // needed to init correctly, because of..?
     spec_1.width = 200;
  return vega_interactive(spec_1, { renderer: 'svg' })}


function _30(md){return(
md`### put model explorer here: simple version

=> can tweet "pension calculator includes a model explorer, using sensitivities" relate to m bostock rent-or-buy`
)}

function _nonCursor(domains,cursor,formula_inputs)
{
  var out = {}
  for (const f in domains) {
    if (cursor[f] != undefined && f != 'range' && formula_inputs.some(d => d == f))
      out[f] = domains[f].filter(d => cursor[f].indexOf(d) == -1)
  }
  return out
}


function _data_part_1(cursor,domains,model,formula_select1,cartesianProduct)
{ // all of multi domain, against cursor-only of e/t else
  var cpObj = Object.assign(Object({}), cursor); delete cpObj.multi
  cpObj[cursor.multi] = domains[cursor.multi];
  cpObj.function$ = [model[formula_select1]]  //function_inputs_cp_restricted[function_inputs_cp_restricted.length-1].function$
  var cpArr = []
  for (const i in cpObj)
    cpArr.push({[i]:cpObj[i]})
  //return cpArr
return cartesianProduct(cpArr).map(({function$, ...d}) => ({...d, function:formula_select1, value: function$(d)}))
}


function _data_part_2b(cursor,formula_inputs,model,formula_select1,nonCursor,cartesianProduct)
{ // nonCursor c-ps (made in a loop over inputs (excluding the multi one): should be more efficient?)
  var cpObj = Object.assign(Object({}), cursor); delete cpObj.multi; //delete cpObj.function$
  //cpObj[cursor.multi] = cursor[cursor.multi];
  //cpObj.function$ = function_inputs_cp_restricted[function_inputs_cp_restricted.length-1].function$

  var out = []
  for (const i in cpObj) { // must be inputs for fn only (not others)
    if (formula_inputs.some(d => d==i)) {
    var cpObj2 = Object.assign({}, cursor);; delete cpObj2.multi;
      cpObj2.function$ = [model[formula_select1]] //function_inputs_cp_restricted[function_inputs_cp_restricted.length-1].function$

    cpObj2[i] = nonCursor[i]//domains[i]
    var arr2 = []
    for (const j in cpObj2)
      /*if (j != 'function$')*/ arr2.push({[j]:cpObj2[j]});

    //return arr2
    if (i != cursor.multi)
    out[out.length] = cartesianProduct(arr2).map(({function$, ...d}) => ({...d, function:formula_select1, value: function$(d)}))
    //out.push(cartesianProduct(arr2).map(({function$, ...d}) => ({...d, function:formula_select, value: function$(d)})));
    }
  }
  //return cpArr
  return out;
//return cartesianProduct(cpArr).map(({function$, ...d}) => ({...d, function:formula_select, value: function$(d)}))
}


function _formula_inputs(introspection,formula_select1){return(
Object.values(introspection.cul_functions).find(d => d.name == formula_select1).inputs
)}

function _facet2_custom(){return(
function facet2_custom(inputs, functions) {
  // this facet does a hconcat and a vconcat, where above the replication by function along rows follows depending on the data, in this case we need to include specific code for each one! (hence why they are input as an array)

  // TODO show titles. future: use diagram
// Problem with gender selection/filters? - isNaN not the correct function here!! custom isundefined function?

  
var s = `{
  "$schema": "https://vega.github.io/schema/vega-lite/v${5}.json",
  "description": "description TODO",
  "data": {"values": []},
  "transform": [],
  "vconcat": [`;

  
var input, fn;

var other_inputs, filters = '', details = '';

// hconcat on inputs
for (var i = 0; i < inputs.length; i++) {
  input = inputs[i];

  other_inputs = inputs.slice();
  other_inputs.splice(i,1);
  filters = '';
  other_inputs.forEach((d) => (filters += `{ "filter":  { "or": ["isNaN(datum.${d})", { "selection": "selection_${d}" } ]}},`));
  filters = filters.slice(0,-1);

  details = '';
  other_inputs.forEach((d) => (details += `{"field": "${d}", "type": "nominal"},`));
  details = details.slice(0,-1);

  //console.log(JSON.stringify({other_inputs, filters, details}))

  //s += `{
  //  "hconcat": [`

  // vconcat on functions
  for (var j = 0; j < functions.length; j++) {
    fn = functions[j];
    s += `
        {
"width":300, "height":30,
      "resolve": {"scale": {"y": "independent"}},
            "layer": [{
          "selection": {
             "selection_${input}": {"type":   "multi", "encodings": ["x"]}
           },
          "mark": "bar",
          "transform": [{"filter": {"field": "function", "equal": "${fn}"}},
            ${filters}
          ],
          "encoding": {
            "x": {
              "field": "${input}",
              "type": "ordinal"
            },
            "y": {
              "aggregate": "sum",
              "field": "value",
              "type": "quantitative"
            },
            "color": {
                "condition":{
                    "selection": "selection_${input}",
                     "value": "red"
                },
                "value":"blue"
            }
          }},{

          "mark": "line",
          "transform": [{"filter": {"field": "function", "equal": "${fn}"}},
            ${filters}
          ],
          "encoding": {
            "detail":[
              ${details}
            ],
            "x": {
              "field": "${input}",
              "type": "ordinal"
            },
            "y": {
              "field": "value",
              "type": "quantitative"
            },
            "color": {
                "condition":{
                    "selection": "selection_${input}",
                     "value": "purple"
                },
                "value":"green"
            }
          }
        }]
      },`
  }

  s = s.slice(0,-1);
  s += ','//']},'
}

s = s.slice(0,-1);
s += ']}'

  return s;
  
}
)}

function _36(md){return(
md`### *formula viewer:*`
)}

function _formula_select(Inputs,introspection){return(
Inputs.select(/*["1_unit_balance_", "1_annual_salary_", "1_unit_allocation_", "0_unit_balance", "0_annual_salary", "0_unit_allocation"]*/Object.entries(introspection.cul_functions).map(([a,b]) => a), {label: "formula", value:"1_unit_balance_"})
)}

function _38($0){return(
$0.value
)}

function _39(md,cs,cul_formula_loc){return(
md`
~~~js
${cs.filter((d, i) => i >= cul_formula_loc.start.line-1 && i < cul_formula_loc.end.line).join('\n')}
~~~
`
)}

function _cul_formula_loc(introspection,formula_select){return(
introspection.cul_functions[formula_select].loc
)}

function _cs(calcuin_fv){return(
calcuin_fv.split('\n')
)}

function _42(c_spec1){return(
c_spec1
)}

function _43(cursor){return(
cursor
)}

function _domainsWithStepOffsets(formulae_info_inputs,cursor,domains,domainsSteps)
{
  var o = {}
  formulae_info_inputs.forEach(f => {
    var c = cursor[f][0];
    o[f] = domains[f].map((d,i) => ({step:i-domainsSteps[f].find(e => e.v==c).step,value:d}))
  })
  return o
}


function _domainsSteps(input_domains_config,_)
{
  var o = {};
  for (var i in input_domains_config) {
    var d = input_domains_config[i];
    o[d.input] = _.range(d.min, d.max, d.step).map((d, i) => ({v:+d.toFixed(2),step:i}))// input_domains_config[i];
  };
  return o
}


function _data_new_sensitivities(cursor,formula_inputs,model,formula_select1,nonCursorSensitivities,cartesianProduct)
{ // nonCursor c-ps (made in a loop over inputs (excluding the multi one): should be more efficient?)
  var cpObj = Object.assign(Object({}), cursor); delete cpObj.multi; //delete cpObj.function$
  //cpObj[cursor.multi] = cursor[cursor.multi];
  //cpObj.function$ = function_inputs_cp_restricted[function_inputs_cp_restricted.length-1].function$

  var out = []
  for (const i in cpObj) { // must be inputs for fn only (not others)
    if (formula_inputs.some(d => d==i)) {
    var cpObj2 = Object.assign({}, cursor);; delete cpObj2.multi;
      cpObj2.function$ = [model[formula_select1]] //function_inputs_cp_restricted[function_inputs_cp_restricted.length-1].function$

    cpObj2[i] = nonCursorSensitivities[i]//domains[i]
    var arr2 = []
    for (const j in cpObj2)
      /*if (j != 'function$')*/ arr2.push({[j]:cpObj2[j]});

    //return arr2
    if (1 || i != cursor.multi)
    out[out.length] = cartesianProduct(arr2).map(({function$, ...d}) => ({...d, function:formula_select1, value: function$(d)}))
    //out.push(cartesianProduct(arr2).map(({function$, ...d}) => ({...d, function:formula_select, value: function$(d)})));
    }
  }
  //return cpArr
  return out;
//return cartesianProduct(cpArr).map(({function$, ...d}) => ({...d, function:formula_select, value: function$(d)}))
}


function _47(md){return(
md`### ~~lets do the sensitivity thing~`
)}

function _48(cursor){return(
cursor
)}

function _49(formulae_info_inputs){return(
formulae_info_inputs
)}

function _50(domains){return(
domains
)}

function _sensitivity_data(formulae_info_inputs,cursor,domains,domainsWithStepOffsets,input_domains_config,formula_select1,model)
{
  var o = []
  var c = {}
  formulae_info_inputs.forEach(i => {
    c[i] = cursor[i][0]
  })
  formulae_info_inputs.forEach(i => {
    domains[i].forEach(v => {
      o.push(Object.assign({...c}, {[i]:v, step:domainsWithStepOffsets[i].find(g => g.value == v).step, sens:i, annotation: [i,`${domainsWithStepOffsets[i].find(g => g.value == v).step >= 0 ? '+' : '-'}= ${Math.abs(domainsWithStepOffsets[i].find(g => g.value == v).step)* input_domains_config.find(d => d.input == i).step}`]}))
    })
  })
  return o.map(d => ({...d, formula: formula_select1, value: model[formula_select1](d), v2: model[formula_select1](d)}))
}


function _52(input_domains_config){return(
input_domains_config
)}

function _nonCursorSensitivities(domains,cursor,formula_inputs)
{
  var out = {}
  for (const f in domains) {
    if (cursor[f] != undefined && f != 'range' && formula_inputs.some(d => d == f))
      out[f] = domains[f]//.filter(d => cursor[f].indexOf(d) == -1)
  }
  return out
}


function _54(data_new_sensitivities,formulae_info_inputs,cursor,domainsWithStepOffsets){return(
data_new_sensitivities.flat().map(d => {
  var step = 0
  formulae_info_inputs.forEach(f => {
    if (d[f] != cursor[f][0]) {
      step = domainsWithStepOffsets[f].find(g => g.value == d[f]).step
    return;
    }
      //domains[f].map((d,i) => ({step:i-domainsSteps[f].find(e => e.v==c).step,value:d}))
  })
  return {...d, step}
}
)
)}

function _mark(Inputs){return(
Inputs.select(["?", "bar", "line", "point","text","rect"], {label: "mark", value:"text"})
)}

function _height(Inputs){return(
Inputs.range([0, 1000], {label: "height", step: 50, value:400})
)}

function _57(formulae_info){return(
formulae_info
)}

function _58(md){return(
md`*download data cell broken*`
)}

function _59(DOM,serialize,projection){return(
DOM.download(serialize(projection), null, "csv download")
)}

function _60(md){return(
md`# Nocode viz`
)}

function _nocode_viz_tag(){return(
''
)}

function _62(md){return(
md`## example nocode tweak: set x to age_in, value to Q type and 's' format to make it cleaner, cycle other inputs on x by keyboarding down/up

Pros and cons to this UI layout, but I like it for mow, it shows the space of what I can viz from a model. The viz doesn't react to all the UI yet. It does react to cursor and the radios, mark and height.`
)}

function _viz_spec(formulae_info_inputs,html,input_domains_config,Event)
{ // DN: transferrable

  const rows = ["formula","value","field 🔓",...formulae_info_inputs,""];
  const cols = ["x","y","color","row","text","detail","size", "field 🔓"]

  const t = html`<thead><tr><td>field</td><td>min</td><td># steps</td><td>size</td><td>cursor</td><td>type</td><td>format</td>${cols.map(c => `<td>${c}</td>`).join('')}</tr></thead>
${rows.map(r => `<tr><td>${r}</td>${ r.substr(-3) == '_in' ? `<td><input type="text" style="width:30px" value="${input_domains_config.find(e => e.input == r).min /*?? 0*/}" /></td><td><input type="number" style="width:50px" min="0" max="100" value="${(input_domains_config.find(e => e.input == r).max - input_domains_config.find(e => e.input == r).min)/input_domains_config.find(e => e.input == r).step}" /></td><td><input type="text" style="width:30px" value="${input_domains_config.find(e => e.input == r).step}" /></td><td><input type="text" style="width:30px" value="${input_domains_config.find(e => e.input == r).default1}" id="cursor_${r}" /></td>` : `<td></td><td></td><td></td><td></td>`}<td><select id="type_${r}" style="width:40px"><option value="nominal">${r == "value" ? "Q" : "N"}</option><option value="ordinal">O</option><option value="quantitative">Q</option></select></td><td><input type="text" id="format_${r}" value="${r == "value" ? ".4~s" : ""}" style="width:30px" /></td>${cols.map(c => `<td><input type="radio" name="${c}" id="${c}_${r}" value="${r}" ${r == "" ? `checked="checked"` : ''}></input></td>`).join('')}</tr>`).join('\n')}
<tr><td>independent scale?</td><td></td><td></td><td></td><td></td><td></td><td></td>${cols.map(c => `<td><input type="checkbox" id="independent_scale_${c}" /></td>`).join('')}</tr>
`

  const el = html`<table>${t}
</table>`//<thead><tr><td>ff</td></tr></thead><tr><td><input type="radio" name="ddd" value="A">A</input></td></tr><tr><td><input type="radio" name="ddd" value="B" checked="checked">B</input></td></tr></table>`

  let up  = () => {
    var o = {cursor:{}, independent_scales:{}, types:{},formats:{},encodings:{"x":"","y":"formula","color":"formula","row":"","text":"value","detail":"","size":"","field 🔓":""}};
    cols.forEach(c => {
      var s = el.querySelector(`input[name="${c}"]:checked`)
      o.encodings[c] = s ? s.value : '';
      s = el.querySelector(`input[id="independent_scale_${c}"]`)
      o.independent_scales[c] = s.checked
    })
    rows.filter(r => r.substr(-3) == "_in").forEach(r => {
      var s  = el.querySelector(`input[id="cursor_${r}"]`);
      o.cursor[r] = s.value == '' ? undefined : +s.value;
      //o.types[r] = el.querySelector(`select[id="type_${r}"]`).value
    })
    rows.forEach(r => {
      //var s  = el.querySelector(`input[id="cursor_${r}"]`);
      //o.cursor[r] = +s.value;
      o.types[r] = el.querySelector(`select[id="type_${r}"]`).value
      o.formats[r] = el.querySelector(`input[id="format_${r}"]`).value
    })
    //var s = el.querySelector('input[name="x"]:checked')
    el.value = o//s ? s.value : ''
    el.dispatchEvent(new Event("input", {bubbles: true}));
  }
  //el.on

  el.onchange = up;

// this is for configuring the default viz spec
el.querySelector(`input[id="y_formula"]`).checked = true;
el.querySelector(`input[id="color_formula"]`).checked = true;
el.querySelector(`input[id="text_value"]`).checked = true;

(el).dispatchEvent(new Event("input", {bubbles: true}))
  up()

  //el.onload = up;
//el.querySelector(`input[id="x_formula"]`).checked = true;
//el.getElementById("formula_x").checked = true;
//el.dispatchEvent(new Event("input", {bubbles: true}));


  return el;
}


function _64(vega,c_spec1){return(
vega(c_spec1)
)}

function _grid(Inputs){return(
Inputs.checkbox(["☰ gridlines ☰"], {label: "", value: []})
)}

function _66($0){return(
$0.querySelector(`input[id="y_formula"]`).checked = true
)}

function _67($0){return(
$0.querySelector(`input[id="color_formula"]`).checked = true
)}

function _68($0){return(
$0.querySelector(`input[id="text_value"]`).checked = true
)}

function _mapped_inputs(viz_spec){return(
Object.entries(viz_spec.encodings).map(d => d[1]).filter(d => d.substr(-3) == "_in")
)}

function _70(viz_spec){return(
viz_spec
)}

function _input_domains_A_overrides(mapped_inputs,domains)
{
  var o = {}
  mapped_inputs.forEach(i => {
    o[i] = domains[i]
  })
  return o
}


function _72(inputs){return(
inputs
)}

function _73(viz_spec){return(
viz_spec.cursor
)}

function _74(use_cursor_from_table){return(
use_cursor_from_table
)}

function _input_domains_A_new(use_cursor_from_table,input_domains_A_projection,input_domains_A){return(
use_cursor_from_table.length ? input_domains_A_projection : input_domains_A
)}

function _input_domains_A(inputs,input_domains_A_overrides)
{
  var o = {}
  Object.entries(inputs).forEach(([k,v]) => {
    o[k] = [v]
  })
  Object.entries(input_domains_A_overrides).forEach(([k,v]) => {
    o[k] = v
  })
  //o.formula = Object.values(model)
  return o
}


function _input_domains_A_projection(viz_spec,input_domains_A_overrides)
{
  var o = {}
  Object.entries(viz_spec.cursor).forEach(([k,v]) => {
    o[k] = [v]
  })
  Object.entries(input_domains_A_overrides).forEach(([k,v]) => {
    o[k] = v
  })
  //o.formula = Object.values(model)
  return o
}


function _input_combos_A(cartesianProduct,input_domains_A_new){return(
cartesianProduct(Object.entries(input_domains_A_new).map(([k,v]) => ({[k]: v})))
)}

function _input_combos_A_projection(cartesianProduct,input_domains_A_projection){return(
cartesianProduct(Object.entries(input_domains_A_projection).map(([k,v]) => ({[k]: v})))
)}

function _projection(formulae_info,formulae_info_inputs,input_combos_A_projection,model){return(
formulae_info.filter(d => formulae_info_inputs.indexOf(d.name+'_in') == -1).map(({name}) => input_combos_A_projection.map(combos => ({...combos,/*[pvt_y]: combos[pvt_y],*/ formula:name, /*[name]*/value: +model[name](combos)/*.toFixed(2)*/}))).flat()
)}

function _links(introspection,URLSearchParams){return(
Object.entries(introspection.cul_scope_ids_to_resource).filter(([cul_scope_id]) => cul_scope_id != 0).map(([cul_scope_id, resource]) => new URLSearchParams(resource.split('?').pop()).get('cul_scope_id') + ' -> ' + new URLSearchParams(resource).get('cul_parent_scope_id'))
)}

function _nodes(introspection,qs){return(
Object.entries(introspection.cul_scope_ids_to_resource).map(d => (`${d[0]} [${ d[0] == 0 ? 'color="green" style="filled" ' :  'color="yellow" style="filled" '}label="[${d[0]}]: ${qs.length ? d[1] : d[1].split('?')[0]}"]`))
)}

function _d(nodes,links){return(
`digraph {
rankdir="RL"
node [shape="box"];
${nodes.join('\n')}
${links.join('\n')}
}`
)}

function _84(md){return(
md`## the calculang:`
)}

function _model_path(q,model_path1){return(
q.get('path') ?? model_path1
)}

function _model_path1(Inputs){return(
Inputs.select(new Map([["Pensions Calculator 💵🧓🤟", "/models/pensions/pensions-calculator"], ["Income Tax Impacts", "/models/impacts/incometax"], ["impactsAB", "/models/impactsAB/impactsAB"], ["simple-cfs-nomemo", "/models/cashflows/simple-cfs-nomemo"]]), {label: "model path", value: "/models/pensions-calculator/pensions"})
)}

function _model(require,b64_to_utf8,module_response){return(
require(URL.createObjectURL(new Blob([b64_to_utf8(module_response.data.content)], { type: "text/javascript" })))
)}

function _code_opt(Inputs){return(
Inputs.select(["📝 calculang source 💬", "✨ calculang output ✨ for 🖥️", "🌲 calculang internal 🌲 for 🖥️"], {label: "🧙 via 🌲s", value: "📝 calculang source 💬"})
)}

function _89(md){return(
md`*Note: if memoisation is turned on, additional memo scopes are generated which **aren't actual source code**.* (strictly what "calculang source" is looking at is calculang transformation input)`
)}

function _90(md){return(
md`### *scope id graph:*`
)}

function _qs(Inputs){return(
Inputs.checkbox(["show query string?"])
)}

function _92(dot,d){return(
dot`${d}`
)}

function _cul_scope_id(Inputs,_,introspection){return(
Inputs.radio(_.range(0,Object.keys(introspection.cul_scope_ids_to_resource).length), {label: "cul_scope_id", value: 0 /*maybe nice to default to last one instead?*/})
)}

function _cv(md,code_opt,dot,introspection,calcuin,calcuout)
{ 
  return md`
### source turned off`
  if (code_opt.indexOf("🌲") != -1) return dot`${introspection.dot}`;
  else
  return md`
~~~js
${code_opt.indexOf("source") != -1 ? calcuin : calcuout}
~~~
` }


function _95(md){return(
md`## appendix`
)}

function _96(md){return(
md`### calculang plugs`
)}

function _q(){return(
{get:() => (undefined)}
)}

function _version(Inputs){return(
Inputs.button("refresh calculang model", {})
)}

function _owner(){return(
"declann"
)}

function _repo(q){return(
q.get('repo') ?? "calculang-miscellaneous-models"
)}

async function _module_response(octokit,owner,repo,model_path){return(
await octokit.request('GET /repos/{owner}/{repo}/contents/{model_path}.js', {
  owner, repo, model_path
})
)}

async function _sourcemap_response(octokit,owner,repo,model_path){return(
await octokit.request('GET /repos/{owner}/{repo}/contents/{model_path}.js.map', {
  owner, repo, model_path
})
)}

function _sourcemap(b64_to_utf8,sourcemap_response){return(
JSON.parse(b64_to_utf8(sourcemap_response.data.content))
)}

async function _calcuin_response(octokit,owner,repo,model_path,cul_scope_id){return(
await octokit.request('GET /repos/{owner}/{repo}/contents/{model_path}_esm/cul_scope_{cul_scope_id}.cul.js', {
  owner, repo, model_path, cul_scope_id
})
)}

async function _calcuin_response_fv(octokit,owner,repo,model_path,formula_select){return(
await octokit.request('GET /repos/{owner}/{repo}/contents/{model_path}_esm/cul_scope_{cul_scope_id}.cul.js', {
  owner, repo, model_path, cul_scope_id: formula_select[0] // won't work for scope > 9
})
)}

function _calcuin(b64_to_utf8,calcuin_response){return(
b64_to_utf8(calcuin_response.data.content)
)}

function _calcuin_fv(b64_to_utf8,calcuin_response_fv){return(
b64_to_utf8(calcuin_response_fv.data.content)
)}

async function _calcuout_response(octokit,owner,repo,model_path,cul_scope_id){return(
await octokit.request('GET /repos/{owner}/{repo}/contents/{model_path}_esm/cul_scope_{cul_scope_id}.mjs', {
  owner, repo, model_path, cul_scope_id
})
)}

function _calcuout(b64_to_utf8,calcuout_response){return(
b64_to_utf8(calcuout_response.data.content)
)}

async function _introspection_response(octokit,owner,repo,model_path){return(
await octokit.request('GET /repos/{owner}/{repo}/contents/{model_path}.introspection.json', {
  owner, repo, model_path
})
)}

async function _fffintrospection_response(octokit,owner,repo,model_path){return(
await octokit.request('GET /repos/{owner}/{repo}/contents/package.json', {
  owner, repo, model_path
})
)}

function _introspection(b64_to_utf8,introspection_response){return(
JSON.parse(b64_to_utf8(introspection_response.data.content))
)}

function _b64_to_utf8(){return(
function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}
)}

async function _octokit_constructor(){return(
(await import('https://cdn.skypack.dev/@octokit/rest@16')).default
)}

function _octokit(octokit_constructor){return(
new octokit_constructor({})
)}

function _copy(){return(
function copy(obj) {
   var res = {};
   for (var p in obj) res[p] = obj[p];
   return res;
 }
)}

function _cartesianProduct(copy){return(
function cartesianProduct(input, current) {
    if (!input || !input.length) { return []; }
 
    var head = input[0];
    var tail = input.slice(1);
    var output = [];
 
     for (var key in head) {
       for (var i = 0; i < head[key].length; i++) {
             var newCurrent = copy(current);         
             newCurrent[key] = head[key][i];
             if (tail.length) {
                  var productOfTail = 
                          cartesianProduct(tail, newCurrent);
                  output = output.concat(productOfTail);
             } else output.push(newCurrent);
        }
      }    
     return output;
 }
)}

async function _vega_interactive(require,$0)
{ // credit to Mike Bostock (starting point): https://observablehq.com/@mbostock/hello-vega-embed
  const v = window.vega = await require("vega");
  const vl = window.vl = await require("vega-lite");
  const ve = await require("vega-embed");
  async function vega(spec, options) {
    const div = document.createElement("div");
    div.value = (await ve(div, spec, options)).view;
    div.value.addEventListener('click', (event, item) => {
      console.log(item.datum);
      /*viewof formula_select.value = item.datum.formula;
      viewof formula_select.dispatchEvent(new CustomEvent("input"));
      viewof month_select.value = item.datum.month_in;
      viewof month_select.dispatchEvent(new CustomEvent("input"));*/
      //if (item.datum.age_0_in != undefined) {viewof inputs.value = {...viewof inputs.value, age_0_in:item.datum.age_0_in}; //cursor.month_in.push(item.datum.month_in);
      //viewof inputs.dispatchEvent(new CustomEvent("input"))};

       //     if (item.datum.age_in != undefined) {viewof inputs.value = {...viewof inputs.value, age_in:item.datum.age_in}; //cursor.month_in.push(item.datum.month_in);
      //viewof inputs.dispatchEvent(new CustomEvent("input"))};

      $0.value = { ...$0.value, ...item.datum };
      $0.dispatchEvent(new CustomEvent("input"))

//y.value.insert('selection_age_0_in_store', [{unit: "concat_1_layer_0", fields: [{"field":"age_0_in","channel":"x","type":"E"}]	, values:[10]}])
//y.value.insert('selection_dampener_in_store', [{unit: "concat_2_concat_2_layer_0", fields: [{"field":"dampener_in","channel":"x","type":"E"}]	, values:[0.95]}])
  //.run()
      
// NOW TODO addSignalListener stuff... is it trigerred for above??
// until there is a selection api...
//https://github.com/vega/vega-lite/issues/2790#issuecomment-976633121
// https://github.com/vega/vega-lite/issues/1830#issuecomment-926138326
      
    }) // DN
    return div;
  }
  vega.changeset = v.changeset;
  return vega;
}


async function _vega(require)
{ // credit to Mike Bostock: https://observablehq.com/@mbostock/hello-vega-embed
  const v = window.vega = await require("vega");
  const vl = window.vl = await require("vega-lite");
  const ve = await require("vega-embed");
  async function vega(spec, options) {
    const div = document.createElement("div");
    div.value = (await ve(div, spec, options)).view;
    div.value.addEventListener('click', (event, item) => { console.log(item.datum) }) // DN
    return div;
  }
  vega.changeset = v.changeset;
  return vega;
}


function _121(md){return(
md`## compassql`
)}

function _cql(require){return(
require("compassql")
)}

function _123(projection){return(
projection
)}

function _schema(cql,projection){return(
cql.schema.build(projection)
)}

function _encodings(viz_spec){return(
Object.entries(viz_spec.encodings).filter(([k,v]) => v != '' && k != 'cursor' && k != 'independent_scales' && k != 'types' && k != 'formats').map(([k,v]) => ({channel:k,field:v,type:viz_spec.types[v],format:viz_spec.formats[v]}))
)}

function _output(cql,projection,mark,encodings,schema){return(
cql.recommend({
  spec: {data: projection,
    mark: mark == 'bar' ? 'line' : mark,
    //tooltip: true,
    encodings/*: [
      {
        channel: "x",
        //aggregate: "mean",
        field: x_channel,
        //type: "quantitative",
      },
      {
        channel: "y",
        field: y_channel,
        //type: "quantitative",
      },
      {
        channel: "text",
        field: text_channel,
        type: "quantitative",
        format: "s"
      },
      {
        channel: "row",
        field: row_channel,
       //type: "quantitative",
        //format: "s"
      },
      {
        channel: "color",
        field: color_channel
      }
    ]*/,
  },
  chooseBy: "effectiveness",
}, schema)
)}

function _vlTree(cql,output){return(
cql.result.mapLeaves(output.result, function (item) {
  return item//.toSpec();
})
)}

function _c_spec(vlTree){return(
vlTree.items[0].toSpec()
)}

function _c_spec1(c_spec,height,projection,viz_spec,mark)
{
  var s = c_spec;
  s.data = {name: 'projection'};
  s.width = 600;
  s.height = height;
  s.datasets = {projection}
  var r = {}
  Object.entries(viz_spec.independent_scales).filter(([k,v]) => v == true).forEach(([k,v]) => { r[k] = 'independent' })
  s.resolve = {scale: r}
  if (mark == "bar") s.mark = "bar"; //{"type": "bar", "tooltip": true};
  var p = s.mark;
  s.mark = {type: p, tooltip:true}
  if (mark == "line") s.mark.point = true
  
  s["config"] ={"legend": {"disable": true}}
  return s
}


function _130(md){return(
md`## credits

made with 💖 and [calculang](https://github.com/calculang)`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("formulae_info")).define("formulae_info", ["model","introspection"], _formulae_info);
  main.variable(observer("formulae_info_inputs")).define("formulae_info_inputs", ["formulae_info"], _formulae_info_inputs);
  main.variable(observer("input_domains_config")).define("input_domains_config", ["d3"], _input_domains_config);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("domains_")).define("domains_", ["inputs"], _domains_);
  main.variable(observer("domains")).define("domains", ["input_domains_config","_"], _domains);
  main.variable(observer()).define(["inputs"], _8);
  main.variable(observer()).define(["formula_inputs","y","viewof inputs"], _9);
  main.variable(observer("ooo")).define("ooo", ["formulae_info_inputs","inputs"], _ooo);
  main.variable(observer("cursor")).define("cursor", ["formula_inputs","ooo"], _cursor);
  main.variable(observer()).define(_14);
  main.variable(observer()).define(["domains"], _15);
  main.variable(observer("cursorStepIndex")).define("cursorStepIndex", ["domains","cursor"], _cursorStepIndex);
  main.variable(observer()).define(["introspection"], _17);
  main.variable(observer()).define(["formulae_info"], _18);
  main.variable(observer("viewof formula_select1")).define("viewof formula_select1", ["Inputs","formulae_info"], _formula_select1);
  main.variable(observer("formula_select1")).define("formula_select1", ["Generators", "viewof formula_select1"], (G, _) => G.input(_));
  main.variable(observer("viewof use_cursor_from_table")).define("viewof use_cursor_from_table", ["Inputs"], _use_cursor_from_table);
  main.variable(observer("use_cursor_from_table")).define("use_cursor_from_table", ["Generators", "viewof use_cursor_from_table"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof inputs")).define("viewof inputs", ["formulae_info_inputs","input_domains_config","Inputs"], _inputs);
  main.variable(observer("inputs")).define("inputs", ["Generators", "viewof inputs"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("v")).define("v", ["html","x"], _v);
  main.variable(observer("x")).define("x", ["vega","sensitivity_data"], _x);
  main.variable(observer()).define(["sensitivity_data"], _26);
  main.variable(observer()).define(["vega","sensitivity_data"], _27);
  main.variable(observer()).define(["vega","formula_inputs","sensitivity_data"], _28);
  main.variable(observer("y")).define("y", ["facet2_custom","formula_inputs","formula_select1","data_part_1","data_part_2b","vega_interactive"], _y);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("nonCursor")).define("nonCursor", ["domains","cursor","formula_inputs"], _nonCursor);
  main.variable(observer("data_part_1")).define("data_part_1", ["cursor","domains","model","formula_select1","cartesianProduct"], _data_part_1);
  main.variable(observer("data_part_2b")).define("data_part_2b", ["cursor","formula_inputs","model","formula_select1","nonCursor","cartesianProduct"], _data_part_2b);
  main.variable(observer("formula_inputs")).define("formula_inputs", ["introspection","formula_select1"], _formula_inputs);
  main.variable(observer("facet2_custom")).define("facet2_custom", _facet2_custom);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("viewof formula_select")).define("viewof formula_select", ["Inputs","introspection"], _formula_select);
  main.variable(observer("formula_select")).define("formula_select", ["Generators", "viewof formula_select"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof formula_select"], _38);
  main.variable(observer()).define(["md","cs","cul_formula_loc"], _39);
  main.variable(observer("cul_formula_loc")).define("cul_formula_loc", ["introspection","formula_select"], _cul_formula_loc);
  main.variable(observer("cs")).define("cs", ["calcuin_fv"], _cs);
  main.variable(observer()).define(["c_spec1"], _42);
  main.variable(observer()).define(["cursor"], _43);
  main.variable(observer("domainsWithStepOffsets")).define("domainsWithStepOffsets", ["formulae_info_inputs","cursor","domains","domainsSteps"], _domainsWithStepOffsets);
  main.variable(observer("domainsSteps")).define("domainsSteps", ["input_domains_config","_"], _domainsSteps);
  main.variable(observer("data_new_sensitivities")).define("data_new_sensitivities", ["cursor","formula_inputs","model","formula_select1","nonCursorSensitivities","cartesianProduct"], _data_new_sensitivities);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["cursor"], _48);
  main.variable(observer()).define(["formulae_info_inputs"], _49);
  main.variable(observer()).define(["domains"], _50);
  main.variable(observer("sensitivity_data")).define("sensitivity_data", ["formulae_info_inputs","cursor","domains","domainsWithStepOffsets","input_domains_config","formula_select1","model"], _sensitivity_data);
  main.variable(observer()).define(["input_domains_config"], _52);
  main.variable(observer("nonCursorSensitivities")).define("nonCursorSensitivities", ["domains","cursor","formula_inputs"], _nonCursorSensitivities);
  main.variable(observer()).define(["data_new_sensitivities","formulae_info_inputs","cursor","domainsWithStepOffsets"], _54);
  main.variable(observer("viewof mark")).define("viewof mark", ["Inputs"], _mark);
  main.variable(observer("mark")).define("mark", ["Generators", "viewof mark"], (G, _) => G.input(_));
  main.variable(observer("viewof height")).define("viewof height", ["Inputs"], _height);
  main.variable(observer("height")).define("height", ["Generators", "viewof height"], (G, _) => G.input(_));
  main.variable(observer()).define(["formulae_info"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["DOM","serialize","projection"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("nocode_viz_tag")).define("nocode_viz_tag", _nocode_viz_tag);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("viewof viz_spec")).define("viewof viz_spec", ["formulae_info_inputs","html","input_domains_config","Event"], _viz_spec);
  main.variable(observer("viz_spec")).define("viz_spec", ["Generators", "viewof viz_spec"], (G, _) => G.input(_));
  main.variable(observer()).define(["vega","c_spec1"], _64);
  main.variable(observer("viewof grid")).define("viewof grid", ["Inputs"], _grid);
  main.variable(observer("grid")).define("grid", ["Generators", "viewof grid"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof viz_spec"], _66);
  main.variable(observer()).define(["viewof viz_spec"], _67);
  main.variable(observer()).define(["viewof viz_spec"], _68);
  main.variable(observer("mapped_inputs")).define("mapped_inputs", ["viz_spec"], _mapped_inputs);
  main.variable(observer()).define(["viz_spec"], _70);
  main.variable(observer("input_domains_A_overrides")).define("input_domains_A_overrides", ["mapped_inputs","domains"], _input_domains_A_overrides);
  main.variable(observer()).define(["inputs"], _72);
  main.variable(observer()).define(["viz_spec"], _73);
  main.variable(observer()).define(["use_cursor_from_table"], _74);
  main.variable(observer("input_domains_A_new")).define("input_domains_A_new", ["use_cursor_from_table","input_domains_A_projection","input_domains_A"], _input_domains_A_new);
  main.variable(observer("input_domains_A")).define("input_domains_A", ["inputs","input_domains_A_overrides"], _input_domains_A);
  main.variable(observer("input_domains_A_projection")).define("input_domains_A_projection", ["viz_spec","input_domains_A_overrides"], _input_domains_A_projection);
  main.variable(observer("input_combos_A")).define("input_combos_A", ["cartesianProduct","input_domains_A_new"], _input_combos_A);
  main.variable(observer("input_combos_A_projection")).define("input_combos_A_projection", ["cartesianProduct","input_domains_A_projection"], _input_combos_A_projection);
  main.variable(observer("projection")).define("projection", ["formulae_info","formulae_info_inputs","input_combos_A_projection","model"], _projection);
  main.variable(observer("links")).define("links", ["introspection","URLSearchParams"], _links);
  main.variable(observer("nodes")).define("nodes", ["introspection","qs"], _nodes);
  main.variable(observer("d")).define("d", ["nodes","links"], _d);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("model_path")).define("model_path", ["q","model_path1"], _model_path);
  main.variable(observer("viewof model_path1")).define("viewof model_path1", ["Inputs"], _model_path1);
  main.variable(observer("model_path1")).define("model_path1", ["Generators", "viewof model_path1"], (G, _) => G.input(_));
  main.variable(observer("model")).define("model", ["require","b64_to_utf8","module_response"], _model);
  main.variable(observer("viewof code_opt")).define("viewof code_opt", ["Inputs"], _code_opt);
  main.variable(observer("code_opt")).define("code_opt", ["Generators", "viewof code_opt"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _89);
  main.variable(observer()).define(["md"], _90);
  main.variable(observer("viewof qs")).define("viewof qs", ["Inputs"], _qs);
  main.variable(observer("qs")).define("qs", ["Generators", "viewof qs"], (G, _) => G.input(_));
  main.variable(observer()).define(["dot","d"], _92);
  main.variable(observer("viewof cul_scope_id")).define("viewof cul_scope_id", ["Inputs","_","introspection"], _cul_scope_id);
  main.variable(observer("cul_scope_id")).define("cul_scope_id", ["Generators", "viewof cul_scope_id"], (G, _) => G.input(_));
  main.variable(observer("cv")).define("cv", ["md","code_opt","dot","introspection","calcuin","calcuout"], _cv);
  main.variable(observer()).define(["md"], _95);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer("q")).define("q", _q);
  main.variable(observer("viewof version")).define("viewof version", ["Inputs"], _version);
  main.variable(observer("version")).define("version", ["Generators", "viewof version"], (G, _) => G.input(_));
  main.variable(observer("owner")).define("owner", _owner);
  main.variable(observer("repo")).define("repo", ["q"], _repo);
  main.variable(observer("module_response")).define("module_response", ["octokit","owner","repo","model_path"], _module_response);
  main.variable(observer("sourcemap_response")).define("sourcemap_response", ["octokit","owner","repo","model_path"], _sourcemap_response);
  main.variable(observer("sourcemap")).define("sourcemap", ["b64_to_utf8","sourcemap_response"], _sourcemap);
  main.variable(observer("calcuin_response")).define("calcuin_response", ["octokit","owner","repo","model_path","cul_scope_id"], _calcuin_response);
  main.variable(observer("calcuin_response_fv")).define("calcuin_response_fv", ["octokit","owner","repo","model_path","formula_select"], _calcuin_response_fv);
  main.variable(observer("calcuin")).define("calcuin", ["b64_to_utf8","calcuin_response"], _calcuin);
  main.variable(observer("calcuin_fv")).define("calcuin_fv", ["b64_to_utf8","calcuin_response_fv"], _calcuin_fv);
  main.variable(observer("calcuout_response")).define("calcuout_response", ["octokit","owner","repo","model_path","cul_scope_id"], _calcuout_response);
  main.variable(observer("calcuout")).define("calcuout", ["b64_to_utf8","calcuout_response"], _calcuout);
  main.variable(observer("introspection_response")).define("introspection_response", ["octokit","owner","repo","model_path"], _introspection_response);
  main.variable(observer("fffintrospection_response")).define("fffintrospection_response", ["octokit","owner","repo","model_path"], _fffintrospection_response);
  main.variable(observer("introspection")).define("introspection", ["b64_to_utf8","introspection_response"], _introspection);
  main.variable(observer("b64_to_utf8")).define("b64_to_utf8", _b64_to_utf8);
  main.variable(observer("octokit_constructor")).define("octokit_constructor", _octokit_constructor);
  main.variable(observer("octokit")).define("octokit", ["octokit_constructor"], _octokit);
  main.variable(observer("copy")).define("copy", _copy);
  main.variable(observer("cartesianProduct")).define("cartesianProduct", ["copy"], _cartesianProduct);
  main.variable(observer("vega_interactive")).define("vega_interactive", ["require","viewof inputs"], _vega_interactive);
  main.variable(observer("vega")).define("vega", ["require"], _vega);
  const child1 = runtime.module(define1);
  main.import("serialize", child1);
  main.variable(observer()).define(["md"], _121);
  main.variable(observer("cql")).define("cql", ["require"], _cql);
  main.variable(observer()).define(["projection"], _123);
  main.variable(observer("schema")).define("schema", ["cql","projection"], _schema);
  main.variable(observer("encodings")).define("encodings", ["viz_spec"], _encodings);
  main.variable(observer("output")).define("output", ["cql","projection","mark","encodings","schema"], _output);
  main.variable(observer("vlTree")).define("vlTree", ["cql","output"], _vlTree);
  main.variable(observer("c_spec")).define("c_spec", ["vlTree"], _c_spec);
  main.variable(observer("c_spec1")).define("c_spec1", ["c_spec","height","projection","viz_spec","mark"], _c_spec1);
  main.variable(observer()).define(["md"], _130);
  return main;
}
