const BASE_URL = 'http://localhost:3000/api/courses';

function renderCourse(course) {
    const container = document.createElement("section");
    container.className = "course-card";
    container.innerHTML = `
        <h3>${course.name} (${course.id})</h3>
        <p><strong>Créditos:</strong> ${course.credits}</p>
        <p><strong>Período:</strong> ${course.term}</p>
        <p><strong>Rótulo:</strong> ${course.label}</p>
        <p><strong>Departamento:</strong> ${course.department}</p>
        <p><strong>Requisitos:</strong> ${Array.isArray(course.requisites) ? course.requisites.join(", ") : course.requisites}</p>
    `;
    return container;
}

function showResult(mensagem, isError = false) {
    const el = document.getElementById('resultado');
    el.innerHTML = '';
    if (isError) {
        el.innerHTML = `<div class="error">${mensagem}</div>`;
        return;
    }
    if (Array.isArray(mensagem)) {
        mensagem.forEach(c => el.appendChild(renderCourse(c)));
        return;
    }
    if (mensagem && typeof mensagem === 'object') {
        el.appendChild(renderCourse(mensagem));
        return;
    }
    el.innerHTML = `<div class="success">${mensagem}</div>`;
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