const BASE_URL = 'http://localhost:3000/api/courses';

function showResult(mensagem, isError = false) {
    const classe = isError ? 'error' : 'success';
    document.getElementById('result').innerHTML = `<div class="${classe}"><pre>${JSON.stringify(mensagem, null, 2)}</pre></div>`;
}

async function getCourse() {
    const id = document.getElementById('courseId').value.trim();
    if (!id) {
        showResult('Digite um ID', true);
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/course/${id}`);
        const data = await response.json();
        if (response.ok) {
            showResult(data);
        } else {
            showResult(data.message, true);
        }
    } catch (error) {
        showResult(`Erro: ${error.message}`, true);
    }
}

async function showTerm() {
    const term = document.getElementById('termNum').value.trim();
    if (!term) {
        showResult('Digite um termo', true);
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/term/${term}`);
        const data = await response.json();
        showResult(data);
    } catch (error) {
        showResult(`Erro: ${error.message}`, true);
    }
}

async function addCourse() {
    const courseData = {
        id: document.getElementById('addId').value.trim(),
    };

    if (!courseData.id) {
        showResult('Preencha ID', true);
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });
        const data = await response.json();
        showResult(data);
        document.getElementById('addId').value = '';
    } catch (error) {
        showResult(`Erro: ${error.message}`, true);
    }
}

async function removeCourse() {
    const id = document.getElementById('removeId').value.trim();
    if (!id) {
        showResult('Digite um ID', true);
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/remove/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (response.ok) {
            showResult(data);
            document.getElementById('removeId').value = '';
        } else {
            showResult(data.message, true);
        }
    } catch (error) {
        showResult(`Erro: ${error.message}`, true);
    }
}