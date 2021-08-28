$(function() {

    // 1.按下enter 把完整數據 存儲到本地存儲內
    // 存儲的數據格式 var todolist = [{title:'xxx',done:false}]
    load();
    $('#title').on('keydown', function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === '') {
                alert('請輸入您的代辦事項喔')
            } else {
                //先讀取本地存儲原來的數據
                var local = getDate();
                // console.log(local);
                // 把local陣列進行更新數據 把最新的數據追加給local陣列
                local.push({
                    title: $(this).val(),
                    done: false
                });
                // 把這個陣列local 存儲給本地儲存
                saveDate(local);
                // 2.toDoList 本地存儲數據渲染加載到頁面
                load();
                $(this).val('');
            }


        }
    });
    // 3. todolist 刪除操作
    $('ol,ul').on('click', 'a', function() {
        // alert(11);
        // 先獲取本地儲存
        var data = getDate();
        // console.log(data);

        // 修改數據
        var index = $(this).attr('id');
        // console.log(index);
        data.splice(index, 1);
        // 保存到本地儲存
        saveDate(data);
        // 重新渲染頁面
        load();
    });

    // 4.todolist 正在進行和已完成選項操作
    $('ol,ul').on('click', 'input', function() {

            // 先獲取本地儲存的數據
            var data = getDate();
            // 修改數據
            var index = $(this).siblings('a').attr('id');
            // console.log(index);
            data[index].done = $(this).prop('checked');
            console.log(data);
            // 保存到本地儲存
            saveDate(data);

            // 重新渲染頁面
            load();

        })
        // 讀取本地存儲的數據
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            // 本地儲存裡面的數據是字符串格式的 但我們需要的是物件b格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存儲數據
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    // 渲染加載數據
    function load() {
        var data = getDate();
        console.log(data);
        // 遍歷前要先清空ol裡面的元素內容
        $('ol,ul').empty();
        var todoCount = 0; //正在進行的個數
        var doneCount = 0; //已經完成的個數
        //遍歷這個數據
        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) {
                $('ul').prepend("<li><input type='checkbox'  checked='checked'><p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>")
                doneCount++;
            } else {
                $('ol').prepend("<li><input type='checkbox' ><p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>")
                todoCount++;
            }

        })
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
})