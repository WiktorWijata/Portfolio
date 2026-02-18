# Local Docker Environment

Test Portfolio.Web aplikacji lokalnie w Docker.

## 🚀 Quick Start

```powershell
cd Deployment\Envs\Local\Scripts
.\run.ps1 -Build
```

Otwórz: http://localhost:5000

## 📋 Wymagania

- ✅ Docker Desktop (uruchomiony)
- ✅ Port 5000 wolny

## 🔧 Użycie

### Pierwszy build (5-10 minut)
```powershell
.\Scripts\run.ps1 -Build
```

### Uruchom (jeśli już zbudowane)
```powershell
.\Scripts\run.ps1
```

### Rebuild po zmianach w kodzie
```powershell
.\Scripts\run.ps1 -Build
```

### Czysta reinstalacja
```powershell
.\Scripts\run.ps1 -Build -Clean
```

### Zatrzymanie
```powershell
docker compose down
```

## 📝 Przydatne komendy

```powershell
# Logi (live)
docker compose logs -f web

# Restart kontenera
docker compose restart web

# Status
docker compose ps

# Shell w kontenerze
docker exec -it portfolio-web-local sh

# Usuń wszystko
docker compose down -v
docker rmi portfolio-web-local
```

## 🏗️ Co się dzieje podczas build?

1. **Stage 1**: Node.js builduje React (Vite)
   - `npm ci` - instaluje dependencies
   - `npm run build` - buduje do `ClientApp/build/`

2. **Stage 2**: .NET builduje backend
   - `dotnet restore` - pobiera NuGet packages
   - Kopiuje React build do `wwwroot/`
   - `dotnet publish` - kompiluje i pakuje

3. **Stage 3**: Runtime image
   - Tylko aplikacja (bez SDK, bez Node)
   - Najmniejszy możliwy rozmiar

## 🐛 Troubleshooting

### Port 5000 zajęty
```powershell
# Sprawdź co używa portu
netstat -ano | findstr :5000

# Zmień port w docker-compose.yml:
ports:
  - "5555:8080"  # Zamiast 5000
```

### Build fails
```powershell
# Wyczyść Docker cache
.\Scripts\run.ps1 -Build -Clean

# Sprawdź logi
docker compose logs web
```

### Aplikacja nie odpowiada
```powershell
# Sprawdź logi
docker logs portfolio-web-local

# Restart
docker compose restart web
```

## 📊 Struktura

```
Local/
├── docker-compose.yml    # Definicja serwisów
├── Scripts/
│   └── run.ps1          # Główny skrypt
└── README.md            # Ta dokumentacja
```

## 🔗 Zobacz też

- [Dockerfile](../../Docker/Dockerfiles/Portfolio.Web.Dockerfile)
- [vite.config.ts](../../../Source/Portfolio.Web/ClientApp/vite.config.ts)
- [Portfolio.Web.csproj](../../../Source/Portfolio.Web/Portfolio.Web.csproj)
