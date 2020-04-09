function calculate(){
    var data = [[],[],[],[]];
    var i00 = parseInt(document.getElementById('00').value);
    var i01 = parseInt(document.getElementById('01').value);
    var i02 = parseInt(document.getElementById('02').value);
    var i03 = parseInt(document.getElementById('03').value);
    var i10 = parseInt(document.getElementById('10').value);
    var i11 = parseInt(document.getElementById('11').value);
    var i12 = parseInt(document.getElementById('12').value);
    var i13 = parseInt(document.getElementById('13').value);
    var i20 = parseInt(document.getElementById('20').value);
    var i21 = parseInt(document.getElementById('21').value);
    var i22 = parseInt(document.getElementById('22').value);
    var i23 = parseInt(document.getElementById('23').value);
    var i30 = parseInt(document.getElementById('30').value);
    var i31 = parseInt(document.getElementById('31').value);
    var i32 = parseInt(document.getElementById('32').value);
    var i33 = parseInt(document.getElementById('33').value);

    data[0].push(i00, i01, i02, i03)
    data[1].push(i10, i11, i12, i13)
    data[2].push(i20, i21, i22, i23)
    data[3].push(i30, i31, i32, i33)

    console.log(data)
    
    // минимаксный
    var minimums = [Math.min(...data[0]), Math.min(...data[1]), Math.min(...data[2]), Math.min(...data[3])]
    // console.log(minimums)
    var maximum = Math.max(...minimums)
    // console.log(maximum)

    var mmPlace = document.getElementById('MM');
    mmPlace.innerText = maximum

    // Байеса-Лапласа
    var dataBL = [[],[],[],[]]
    data.forEach((element, index) => {
        dataBL[index] = data[index].map(function(el) {
            return el*0.25;
        })
    });
    // console.log(dataBL)
    
    var summsBL = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // console.log(dataBL[0].reduce(reducer));
    dataBL.forEach((element, index) => {
        // console.log(summsBL[index])
        summsBL[index] = element.reduce(reducer)
    });
    console.log('Summ BL'+ summsBL)

    var BL = Math.max(...summsBL)
    // console.log(BL)
    var blPlace = document.getElementById('BL');
    blPlace.innerText = BL


    // Гермейера
    var minimumsG = [Math.min(...dataBL[0]), Math.min(...dataBL[1]), Math.min(...dataBL[2]), Math.min(...dataBL[3])]
    // console.log(minimumsG)
    var maximumG = Math.max(...minimumsG)
    // console.log(maximumG)
    var gPlace = document.getElementById('G');
    gPlace.innerText = maximumG

    // Гурвица
    var minimumsGur = [Math.min(...data[0])*0.5, Math.min(...data[1])*0.5, Math.min(...data[2])*0.5, Math.min(...data[3])*0.5]
    // console.log(minimumsGur)
    var maximumsGur = [Math.max(...data[0])*0.5, Math.max(...data[1])*0.5, Math.max(...data[2])*0.5, Math.max(...data[3])*0.5]
    // console.log(maximumsGur)
    var summsGur = []
    for (let index = 0; index < 4; index++) {
        summsGur[index]= minimumsGur[index]+maximumsGur[index];
    }
    // console.log(summsGur)
    var gur = Math.max(...summsGur)
    // console.log(gur)

    var gurPlace = document.getElementById('Gur');
    gurPlace.innerText = gur

    //Сэвиджа
    var dataSev = [[],[],[],[]]
    var max1col = Math.max(i00, i10, i20, i30)
    // console.log(max1col)
    var max2col = Math.max(i01, i11, i21, i31)
    // console.log(max2col)
    var max3col = Math.max(i02, i12, i22, i32)
    // console.log(max3col)
    var max4col = Math.max(i03, i13, i23, i33)

    for (let row = 0; row < 4; row++) {
        dataSev[row][0] = [max1col- data[row][0], max2col- data[row][1], max3col-data[row][2], max4col-data[row][3]]
    }
    console.log(dataSev)
    var maximumsSev = [Math.max(...dataSev[0][0]), Math.max(...dataSev[1][0]), Math.max(...dataSev[2][0]), Math.max(...dataSev[3][0])]
    console.log(dataSev[0][0])
    console.log(dataSev[1][0])
    console.log(dataSev[2][0])
    console.log(dataSev[3][0])
    console.log(Math.max(...dataSev[0][0]))
    console.log(maximumsSev)
    var minimumSev = Math.min(...maximumsSev)
    console.log(minimumSev)

    var sevPlace = document.getElementById('Sev');
    sevPlace.innerText = minimumSev


    // Ходжа-Лемана
    var smth = summsBL.map(function(element) {
        return element*0.5;
    });
    var sum = smth.map(function (num, idx) {
        return num + minimumsGur[idx];
      });
    var hodLem = Math.max(...sum)
    console.log(sum)
    console.log(hodLem)

    var hodLemPlace = document.getElementById('HL');
    hodLemPlace.innerText = hodLem

    // Составной Б-Л
    var ar1=[];
    var difrenceAr1=[]
    minimums.forEach((element,index) => {
      difrenceAr1[index] = maximum-element
        if (maximum-element<=maximum) {
            ar1.push(index)
        }
        // else{
        //     ar1.push(false)
        // }
    });

    var maxInRows = [Math.max(...data[0]), Math.max(...data[1]), Math.max(...data[2]), Math.max(...data[3])]
    console.log(ar1)

    var ar2=[];
    var minOfmin = Math.min(...minimums)
    // console.log(minOfmin)
    for(var i=0; i<4; i++){
      console.log(data[i][i])
            if(data[i][i]-minOfmin>=difrenceAr1[i]){
                ar2.push(i)
            }
            // else{
            //     ar2.push(false)
            // }
    }
    console.log(ar2)

    // проверка пересечения
    var sub = compare(ar1, ar2)
    console.log(sub)
    var sblPlace = document.getElementById('SBL');
    if (sub.length == 0) {
      // пересечения нет
      sblPlace.innerText = 'Пересечений нет'
    }
    else if (sub.length == 1){
      // цифра и есть индекс
      sblPlace.innerText = sub[0]+1
    } 
    else {
      var indexOfBL = summsBL.indexOf(BL)
      console.log(indexOfBL) 
      var indBLarr = [indexOfBL]
      var isBLhere = compare(sub, indBLarr)
      console.log(isBLhere) 
      sblPlace.innerText = parseInt(isBLhere)+1
    }
    



    // Произведений
    var proPlace = document.getElementById('PRO');
    var isAbleToCalculate =  true
    data.forEach(element => {
        element.forEach(el=>{
            if (el<0) {
                // console.log('heer')
                isAbleToCalculate = false
            }
        })
    });
    // console.log(isAbleToCalculate)
    if (isAbleToCalculate) {
        // Calculate
        var arrayMultiplied = []
        // console.log(data)
        const multiplyAll = (accumulator, currentValue)=> accumulator*currentValue;
        data.forEach((element, index)=>{
            // console.log(data)
            arrayMultiplied[index] = element.reduce(multiplyAll)
        })
        // console.log(arrayMultiplied)
        var maxPro = Math.max(...arrayMultiplied)
        // console.log(maxPro)
        proPlace.innerText = maxPro
    }
    else{
        proPlace.innerText = 'Не возможно рассчитать. В матрице есть отрицательные числа.'
    }
}
function example(num){
    var place = document.getElementById('example-place');
    const ex1 =`<table class="table table-bordered table-responsive" id="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">F1</th>
        <th scope="col">F2</th>
        <th scope="col">F3</th>
        <th scope="col">F4</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <th scope="row">E0</th>
      <td>
        <input type="text" id="00" value="-450">
      </td>
      <td>
        <input type="text" id="01" value="-5000">
      </td>
      <td>
        <input type="text" id="02" value="-10000">
      </td>
      <td>
        <input type="text" id="03" value="-25000">
      </td>
    </tr>
    
    <tr>
      <th scope="row">E1</th>
      <td>
        <input type="text" id="10" value="-1000">
      </td>
      <td>
        <input type="text" id="11" value="-2480">
      </td>
      <td>
        <input type="text" id="12" value="-5000">
      </td>
      <td>
        <input type="text" id="13" value="-10000">
      </td>
    </tr>

    <tr>
      <th scope="row">E2</th>
      <td>
        <input type="text" id="20" value="-200">
      </td>
      <td>
        <input type="text" id="21" value="-1500">
      </td>
      <td>
        <input type="text" id="22" value="-3000">
      </td>
      <td>
        <input type="text" id="23" value="-5000">
      </td>
    </tr>

    <tr>
      <th scope="row">E3</th>
      <td>
        <input type="text" id="30" value="0">
      </td>
      <td>
        <input type="text" id="31" value="-500">
      </td>
      <td>
        <input type="text" id="32" value="-1000">
      </td>
      <td>
        <input type="text" id="33" value="-2000">
      </td>
    </tr>
    </tbody>
  </table>`
    const ex2 =`<table class="table table-bordered table-responsive" id="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">F1</th>
        <th scope="col">F2</th>
        <th scope="col">F3</th>
        <th scope="col">F4</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <th scope="row">E0</th>
      <td>
        <input type="text" id="00" value="5">
      </td>
      <td>
        <input type="text" id="01" value="30">
      </td>
      <td>
        <input type="text" id="02" value="50">
      </td>
      <td>
        <input type="text" id="03" value="85">
      </td>
    </tr>
    
    <tr>
      <th scope="row">E1</th>
      <td>
        <input type="text" id="10" value="10">
      </td>
      <td>
        <input type="text" id="11" value="38">
      </td>
      <td>
        <input type="text" id="12" value="60">
      </td>
      <td>
        <input type="text" id="13" value="90">
      </td>
    </tr>

    <tr>
      <th scope="row">E2</th>
      <td>
        <input type="text" id="20" value="15">
      </td>
      <td>
        <input type="text" id="21" value="46">
      </td>
      <td>
        <input type="text" id="22" value="70">
      </td>
      <td>
        <input type="text" id="23" value="95">
      </td>
    </tr>

    <tr>
      <th scope="row">E3</th>
      <td>
        <input type="text" id="30" value="20">
      </td>
      <td>
        <input type="text" id="31" value="54">
      </td>
      <td>
        <input type="text" id="32" value="80">
      </td>
      <td>
        <input type="text" id="33" value="100">
      </td>
    </tr>
    </tbody>
  </table>`
  var table = document.getElementById('table')
    if (num==1) {
        place.removeChild(table)
        place.insertAdjacentHTML('afterbegin', ex1)
    }
    else{
        place.removeChild(table)
        place.insertAdjacentHTML('afterbegin', ex2)
    }
}

function compare(arr1, arr2) {
  const finalarray =[]
  arr1.forEach((e1)=>arr2.forEach((e2)=>{
    if (e1 == e2) {
      finalarray.push(e1)
    }
  }))
  return finalarray
}