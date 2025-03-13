
$(document).on("click", "#speak", init);

function init() {

    // TODO: RECOGNIZE SPEECH

    alert("Speak!");

}



$(document).on("click", "#submit", send);

function send() {

    var text = $("#query").val();

    if (text == "") {

        alert("Write something!");

    } else {

        $("#output").prepend("<br />");
        $("#output").prepend("[😀] " + text);
        $("#query").val("");

        $.ajax({
            url: 'https://code.schoolofdesign.ca/api/openai/v1/chat/completions',
            crossDomain: true,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                'model': 'gpt-4o-mini',
                'messages': [
                    {
                        'role': 'system',
                        'content': 'You are my expert advisor specialized in Canada. Only speak to me in English, and keep the response to one or two sentences max.'
                    },
                    {
                        'role': 'user',
                        'content': text
                    },
                    {
                        'role': 'assistant',
                        'content': 'Refer to the following conversation. ' + $("#output").text()
                    }
                ]
            })
        }).done(function (response) {

            var reply = response.choices[0].message.content;

            $("#output").prepend("<br />");
            $("#output").prepend("[🤖] " + reply);

            // TODO: SYNTHESIZE SPEECH

        });


    }
}