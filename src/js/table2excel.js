;(function (window) {
    'use strict'
    
    var API_URL = '/center/table2excel/export';

    if(typeof(env) !== 'undefined'){
        API_URL = env["TABLE2EXCEL_API_URL"];
    }

    function I(name){
        return $('#' + name);
    }

    function C(name){
        return $('.' + name);
    }

    function exportXLSX(blob){
        if (typeof window.navigator.msSaveBlob === 'function') {
            window.navigator.msSaveBlob(blob, "export-" + new Date().getTime() + ".xlsx");
        } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "export-" + new Date().getTime() + ".xlsx";
            document.body.appendChild(link);
            link.click();
        }
    }

    function setCookie(cname, cvalue, exhour) {
        var d = new Date();
        d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    function table2excel (tableId){
        if(tableId == undefined){
            console.log('Table2Excel : Please specify table id');
            return 0;
        }

        var table = (I(tableId).length > 0) ? I(tableId) : C(tableId);

        var header = table.find('thead').find('td').length == 0 ? table.find('thead').find('th') : table.find('thead').find('td');
        var headerTitle = [];

        var body = table.find('tbody').find('tr');
        var bodyData = [];
        var bodyJson = {};

        var goodHeaderAndData = true;

        if(header.length <= 0 || body.length <= 0){
            console.log('Table2Excel : Header Table or Body Table not have any data');
            return 0;
        }

        header.each(function(i, e){
            headerTitle.push($(e).text());
        })

        //console.log(body)

        body.each(function(i, e){
            var row = [];
            var thisRow = $(e).find('td')
            thisRow.each(function(i, e){
                row.push($(e).text());
            })

            if(row.length != headerTitle.length){
                goodHeaderAndData = false;
                return false;
            }
            bodyData.push(row);
        })

        if(!goodHeaderAndData){
            console.log('Table2Excel : Bad header and data');
            return 0;
        }

        for(var i = 0; i < bodyData.length; i++){
            bodyJson[i] = bodyData[i];
        }

        jQuery.ajax({
            url: API_URL,
            data: {header : headerTitle, data : bodyJson},
            method: 'POST',
            cache:false,
            xhrFields:{
                responseType: 'blob',
                withCredentials: true
            },
            success: function(result){
                exportXLSX(result)
            },
            error:function(httpObj, result){
                console.log('something wrong', httpObj);
            }
        });
        

        //return {'header' : headerTitle, 'data' : bodyJson};

        //console.log(headerTitle)
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return table2excel
        })
    } else if (typeof module === 'object' && module.exports) {
        module.exports = table2excel
    } else {
        window.table2excel = table2excel
    }
    
})(this)