console.log("In script file Loading");
const RESPONSE_DONE =4;
const STATUS_OK = 200;
const USER_LIST_ID = "user_list_div";
const URL = '/api/user';
window.onload = getUsersAJAX();
//----------------------getTodoAJAX()------------------------------------------
function getUsersAJAX() {

    var xhr=new XMLHttpRequest();
    xhr.open("GET",URL,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            //is statuscode is OK

            if(xhr.status ==STATUS_OK)
            {
                ShowUserList(USER_LIST_ID,xhr.responseText);
               
            }
        }
    }
    xhr.send(data=null);
}
//------------------------------AddActive(id,todo_data_json)--------------------------------------
function ShowUserList(id,todo_data_json)
{
    var users = JSON.parse(todo_data_json);
    var parent = document.getElementById(id);
    var userList = users.userList;
   // console.log(parent);
    //console.log(todos);
    parent.innerHTML="";
    var rowElement = document.createElement("tr");
    var nameHeadElement = document.createElement("th");
    nameHeadElement.innerText = "Name";
    var ageHeadElement = document.createElement("th");
    ageHeadElement.innerText = "Age";
    var cityHeadElement = document.createElement("th");
    cityHeadElement.innerText = "City";

    rowElement.appendChild(nameHeadElement);
    rowElement.appendChild(ageHeadElement);
    rowElement.appendChild(cityHeadElement);

    parent.appendChild(rowElement);
    var length = userList.length;

    if(parent)
    {
        Object.keys(userList).forEach
        (
            function (key)
            {
                console.log(userList[key])
                var user_element = CreateElement(key,userList[length-key-1])
                parent.appendChild(user_element);
            }//end of function
        )//end of foreach loop
    }//end of if
}// end of AddActive() Function

//-----------------------------CreateElement(id,todo_object)-------------------------------------
function CreateElement(id,user_object)
{
    var rowElement = document.createElement("tr");

    var nameDataElement = document.createElement("td");
    nameDataElement.innerText = user_object.Name;

    var ageDataElement = document.createElement("td");
    ageDataElement.innerText = user_object.Age;
    var cityDataElement = document.createElement("td");
    cityDataElement.innerText = user_object.City;

    rowElement.appendChild(nameDataElement);
    rowElement.appendChild(ageDataElement);
    rowElement.appendChild(cityDataElement);

    //main_element.appendChild(rowElement);
    return  rowElement;
}

//-----------------------------AddTodoAJAX()-----------------------------------------
function AddUserAJAX(){
    var name=document.getElementById("name_field_id").value;
    var age = document.getElementById("age_field_id").value;
    var city = document.getElementById("city_field_id").value;
    console.log("name: "+ name + "\tage: " + age + "\tcity:"+ city);
    var xhr= new XMLHttpRequest();
    xhr.open("POST",URL,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    console.log("Connection opened");

    var data="Name="+name + "&Age="+age+ "&City=" + city;

    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            //is statuscode is OK

            if(xhr.status ==STATUS_OK)
            {
                console.log("successful request");
                getUsersAJAX();

            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    console.log("sending data");
    xhr.send(data);
}

setTimeout(function(){ getUsersAJAX(); }, 10000);