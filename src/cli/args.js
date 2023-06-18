const parseArgs = () => {
    for (let i = 0; i < process.argv.length; i += 2) {
        console.log(process.argv[i].slice(2) + ' is ' + process.argv[i+1]);
    }
};

parseArgs();