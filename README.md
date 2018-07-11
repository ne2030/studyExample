# studyExample
Example Codes I made for studying.

Check the list

### FE examples

1. ajax Call

```javascript

var order = 0;
let ajaxBtn = document.getElementById('ajax');
ajaxBtn.addEventListener('click', () => {makeRequest("GET", "http://localhost:8000/api/stack", getStack)});

/*
* custom callback
* param@ req: ajax xhr object // req.responseText or req.responseXML
*/
function getStack(req){
    let data = JSON.parse(req.responseText)[order];
    let target = document.getElementsByClassName('content')[0];
    let content = `<p> skill: ${data.skill} </p>
    <p> type: ${data.type}</p>
    <p> description: ${data.description}</p>
    <p> mastery: ${data.mastery}</p>
    `;
    if (order == 4) { order = 0; }
    else order ++
    target.innerHTML = content;
}

// ajax module
function makeRequest (method, url, callback){
    var httpRequest
    // xml configuration
    if (window.XMLHttpRequest) { // Mozilla, Safari, Chrome...
        httpRequest = new XMLHttpRequest;
    } else if (window.ActiveXObject) { // IE
        try { httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (e) {
            try { httpRequest = new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) { console.log(e); }
        }
    }

    if (!httpRequest) {
        alert("it's not supported browser");
        return false
    }
    httpRequest.onreadystatechange = readyCallback;
    httpRequest.open(method, url);
    httpRequest.send();
    function readyCallback (){
    try {
        if (httpRequest.readyState === 4)
            if (httpRequest.status === 200) {
                callback(httpRequest);
            } else { console.error('request error!')}
    } catch (e) { console.error('request error')}
    };
}

```


2. alert (angulr-toastr)

```javascript

function makeAlert() {
    let alertType = 'error';
    let message = document.getElementById('message').value || '';
    //check if conatiner exists
    if (!document.getElementById("alert-container")) {
        let container = document.createElement('div');
        container.id = "alert-container";
        container.classList = ["alert-top-right"];
        container.style['pointer-events'] = "auto";

        let body = document.getElementsByTagName('body')[0];
        document.body.appendChild(container);
    }

    let container = document.getElementById('alert-container');
    let content = document.createElement('div');
    content.innerHTML =
    `
        <div class="alert alert-${alertType}" onclick="tapAlert(this)">
          <div on="allowHtml">
            <div class="alert-title">${alertType}</div>
            <div class="alert-message">${message}</div>
          </div>
        </div>
    `;
    container.appendChild(content.firstElementChild);
    var newAlert = container.lastChild;
    window.setTimeout(()=>{
        $(newAlert).fadeOut('slow', function(){
            $(this).remove();
        });
    }, 4000);
}

function tapAlert(el){
    // el.classList.remove('faded');
    $(el).fadeOut('slow', function(){
        $(this).remove();
    });
}

```

3. jQuery vs Javascript (performance)


```javascript
// 시작, 끝 시간 변수 선언
let a, b;

// test logic - jQuery
let jq = 0;

for (let i = 0; i < 20; i++){
    a = new Date();
    var $c = $("<div />").addClass("container");
    for (let i=0; i<10000; i++){
        $c.append($("<div/ >").addClass("test-div"));
    }
    $("BODY").append($c);
    b = new Date();
    jq += b-a;
}


// test logic - pure js
let js = 0;

for (let i = 0; i < 20; i++) {
    a = new Date();
    let t = document.createDocumentFragment();
    for (let i = 0; i < 10000; i++) {
        let e = document.createElement("div");
        e.className = "test-div";
        t.appendChild(e);
    }
    document.body.appendChild(t);
    b = new Date();
    js += b-a;
}

console.log(`jq: ${jq/20}`, `js: ${js/20}`);
```

4. onclick (this parameter)

5. hoisting (let, var)

### BackEnd examples

1. co
( 비동기 처리 로직 모듈 )

2. https
( node.js 에서의 https 통신 환경 구축 )

3. jwt
( json web token 생성 )

4. RESTful API
( method overriding 모듈을 사용하는 RESTful API 구축 )

5. module export
( object.assign 체크 )

6. sequelize
( node.js 의 ORM 모듈 )

7. express middleware
( 익스플레스의 미들웨어 처리 순서, next() 의 실행 )
