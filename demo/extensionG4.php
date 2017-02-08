<?php
//error_log(print_r($_POST,true));
$tabRetour['message'] = 'Erreur.';
$tabRetour['status'] = '000001';
$tabRetour['data'] = '';
$erreur = false;

if(isset($_POST['id']) && !empty($_POST['id'])) {
    $id = str_replace('"', '', $_POST['id']);
    setcookie("id_browser_php", $id, time()+360000000);
}
else {
    if(isset($_COOKIE['id_browser_php']) && !empty($_COOKIE['id_browser_php'])) {
        $id = $_COOKIE['id_browser_php'];
    }
    else {
        $id = "defaultExtensionG4";
    }
}

$dossier = 'extensionG4/';
$fichier = $dossier.$id.'.txt';
$fichierDefault = $dossier."defaultExtensionG4.txt";

if(isset($_POST['page']) && !empty($_POST['page'])) {
    if($_POST['page'] == "background") {
        $tabRetour['message'] = 'Erreur lors de l\'enregistrement des données.';
        $tabRetour['status'] = '000002';

        unset($_POST['page']);
        unset($_POST['id']);
        $myfile = fopen($fichier, "w") or $erreur = true;

        if(!$erreur) {
            foreach ($_POST as $ligne) {
                foreach ($ligne as $key => $val) {
                    fputs($myfile, $key.':'.$val."\n");
                }
            }
            fclose($myfile);
            $tabRetour['message'] = 'Enregistrement effectué avec succès.';
            $tabRetour['status'] = 1;
        }
    }
    elseif($_POST['page'] == "script") {
        $tabRetour['message'] = 'Erreur lors de la récupération des données.';
        $tabRetour['status'] = '000002';
        if(empty($id) || $id == "undefined") {
            $fichier = $fichierDefault;
        }
        $myfile = fopen($fichier, "r") or $erreur = true;

        if(!$erreur) {
            $props = array();
            while (($line = fgetss($myfile)) !== false) {
                $prop = explode(':', str_replace("\n", "", $line));
                $props[$prop[0]] = $prop[1];
            }
            fclose($myfile);
            $tabRetour['message'] = 'Récupération des paramètres effectuée avec succès.';
            $tabRetour['status'] = 1;
            $tabRetour['data'] = $props;
        }
    }
    elseif($_POST['page'] == "popupConfig") {
        $props = array();
        if($_POST['active'] === "true" || $_POST['active'] === true) {
            $myfile = fopen($fichier, "r") or $erreur = true;
            if(!$erreur) {
                while (($line = fgets($myfile)) !== false) {
                    $prop = explode(':', str_replace("\n", "", $line));
                    if ($prop[0] != 'active') {
                        $props[$prop[0]] = $prop[1];
                    }
                }
            }
            else{
                $myfile = fopen($fichierDefault, "r") or $erreur = true;
                while (($line = fgets($myfile)) !== false) {
                    $prop = explode(':', str_replace("\n", "", $line));
                    $props[$prop[0]] = $prop[1];
                }
            }

            fclose($myfile);
            $myfile = fopen($fichier, "w") or $erreur = "true";
            $props['active'] = $_POST['active'];

            foreach ($props as $key => $val) {
                fputs($myfile, $key.':'.$val."\n");
            }
            fclose($myfile);

            $tabRetour['message'] = 'Enregistrement effectué avec succès.';
            $tabRetour['status'] = 1;
            $tabRetour['data'] = $_POST['active'];
        }
    }
    elseif($_POST['page'] == "popupRecup") {
        $myfile = fopen($fichier, "r") or $erreur = true;
        if(!$erreur) {
            while (($line = fgets($myfile)) !== false) {
                $prop = explode(':', str_replace("\n", "", $line));
                if($prop[0] == "active") {
                    $tabRetour['data'] = $prop[1];
                    break;
                }
            }
            if(empty($tabRetour['data'])) {
                $tabRetour['data'] = true;
            }
            fclose($myfile);
            $tabRetour['message'] = 'Récupération effectuée avec succès.';
            $tabRetour['status'] = 1;
        }
    }
}
if($erreur) {
    $tabRetour['data'] = $_POST;
}
echo json_encode($tabRetour);