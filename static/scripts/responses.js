var data;
var parsedData;

async function getBotResponse(input) {       
    await asyncCall(input);
    return parsedData;
}  

async function asyncCall(input) {
    const response = await fetch ('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            prompt: input
        })
    })
    console.log("hey")
    if (response.ok) {
        data = await response.json();
        parsedData = data.bot.trim()
        console.log(parsedData)
    } else {
        const err = await response.text();
    }

}

