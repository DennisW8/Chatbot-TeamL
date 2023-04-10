var data;
var parsedData;

async function getBotResponse(input) {
    if (input == "hi") {
        return "Hello!" ;
    } else if (input == "Can you provide the pdf link to the UNSW Business Expense Policy?") {
        return "The UNSW Business Expense Policy can be found at the following link: https://www.unsw.edu.au/content/dam/pdfs/governance/policy/2022-01-policies/businessexpensepolicy.pdf" ;
    } else {        
        await asyncCall(input);
        return parsedData;
    }
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

