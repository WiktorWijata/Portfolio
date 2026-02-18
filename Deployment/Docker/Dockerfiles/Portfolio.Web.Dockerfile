# Build context: root repozytorium
# docker build -f Deployment/Docker/Portfolio.Web.Dockerfile -t portfolio-web:local .

# ============================================
# Stage 1: Build React SPA
# ============================================
FROM node:22-alpine AS frontend-build
WORKDIR /app/clientapp

# Copy package files
COPY Source/Portfolio.Web/ClientApp/package*.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Copy source code
COPY Source/Portfolio.Web/ClientApp/ ./

# Build React app (output to build/)
RUN npm run build

# ============================================
# Stage 2: Build .NET application
# ============================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build
WORKDIR /app

# Copy project file for restore
COPY Source/Portfolio.Web/Portfolio.Web.csproj ./Portfolio.Web/

# Restore dependencies
RUN dotnet restore Portfolio.Web/Portfolio.Web.csproj

# Copy all source files from Portfolio.Web
COPY Source/Portfolio.Web/ ./Portfolio.Web/

# Copy built React app to wwwroot (from build/ directory)
COPY --from=frontend-build /app/clientapp/build ./Portfolio.Web/wwwroot/

# Build and publish (skip SPA build - already done in stage 1)
WORKDIR /app/Portfolio.Web
RUN dotnet publish -c Release -o /app/out -p:BuildingInsideDocker=true

# ============================================
# Stage 3: Runtime
# ============================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# Copy published app
COPY --from=backend-build /app/out ./

# Metadata
LABEL maintainer="Wiktor Wijata"
LABEL description="Portfolio.Web - React SPA + .NET Backend"

# Expose port
EXPOSE 8080

# Set environment
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Development

# Entry point
ENTRYPOINT ["dotnet", "Portfolio.Web.dll"]