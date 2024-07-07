<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $instagram = $_POST['instagram'];

    // File path
    $file = 'contatti.txt';

    // Prepare data to save
    $data = "Nome: $name, Instagram: $instagram\n";

    // Save data to file
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
        echo "Dati salvati con successo";
    } else {
        echo "Errore durante il salvataggio dei dati";
    }
} else {
    echo "Richiesta non valida";
}
?>
