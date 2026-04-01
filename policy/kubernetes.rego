package main

# Refuse l'exécution si runAsNonRoot n'est pas vrai 
deny[msg] {
  input.kind == "Deployment"
  not input.spec.template.spec.securityContext.runAsNonRoot == true
  msg = "Erreur de sécurité : Le conteneur ne doit pas tourner en root (runAsNonRoot doit être true)."
}