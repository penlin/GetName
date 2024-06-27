

const app_endpoint='https://script.google.com/macros/s/AKfycbxD_IWw5qmHxz9y0MwSb9qvMJ8yXOyy9DVVRiDx6Y7A_fdpaAhQr5G0TFVZGWZxgqpO/exec';

let candidates = [];

function getCandidates() {
    $.get(app_endpoint).done(resp => {
        if (typeof(resp) === 'object') {
            candidates = resp;
        } else {
            candidates = JSON.parse(resp);
        }
        candidates.sort();
        let content = '';
        let line_count = 0;
        candidates.forEach((name, index) => {
            if (line_count % 16 === 0) {
                content += '<p>';
            }
            content += `${name} `;
            if (line_count % 16 === 15) {
                content += '</p>';
            }
            line_count += 1;
        });
        if (line_count % 16 !== 15) {
            content += '</p>';
        }
        document.getElementById('candidates').innerHTML = content;
    }).fail(err => {
        alert('Fetch candidates error');
        console.warn(err);
    });
}

function addCandidate(name) {
    if (candidates.includes(name)) {
        return alert(`${name} already in the candidate list`);
    }
    $.get(`${app_endpoint}?_t=${new Date().getTime()}&name=${name}`).done(resp => {
    /*
    $.ajax({
        url: app_endpoint,
        type: 'POST',
        data: `name=${name}`,
        contentType: 'text/plain',
    }).done(resp => {*/
        if (resp.Status === 200) {
            alert(`add ${name} success!`);
        } else {
            alert(`add ${name} failed: ${resp.Status}`);
        }
    }).fail(err => {
        alert('add candidates error');
        console.warn(err);
    });
}