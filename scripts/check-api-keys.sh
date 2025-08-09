#!/bin/bash

# Arquivos que vão entrar no commit
FILES=$(git diff --cached --name-only)

# Padrões que vamos procurar
PATTERNS='(AIza[0-9A-Za-z\-_]{35})|(sk-[0-9a-zA-Z]{32,})|(ghp_[0-9A-Za-z]{36})'

# Procurar nos arquivos staged
if grep -E -r --color=always "$PATTERNS" $FILES > /dev/null 2>&1; then
    echo "❌ Commit bloqueado: Detectada possível API Key nos arquivos:"
    grep -E -r --color=always "$PATTERNS" $FILES
    echo "💡 Remova ou proteja essa chave antes de commitar."
    exit 1
fi

exit 0