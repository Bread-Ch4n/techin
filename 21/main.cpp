#include <format>
#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

double calculateDistance(const std::pair<int, int>& p1, const std::pair<int, int>& p2) {
    return std::sqrt(std::pow(p2.first - p1.first, 2) + std::pow(p2.second - p1.second, 2));
}

double calculateRouteDistance(const std::vector<std::pair<int, int>>& route) {
    double totalDistance = 0.0;
    for (size_t i = 0; i < route.size() - 1; ++i) {
        totalDistance += calculateDistance(route[i], route[i + 1]);
    }
    return totalDistance;
}

int main() {
    const std::string filename = "../coordinates.txt";

    std::ifstream file;
    try { file.open(filename); } catch (const std::exception& e) { std::cerr << e.what() << std::endl; return 1; }

    std::string content((std::istreambuf_iterator(file)),
                        std::istreambuf_iterator<char>());
    file.close();

    json parsedData = json::parse(content);
    std::vector<std::pair<double, int>> routeDistances;

    for (std::size_t index = 0; index < parsedData.size(); ++index) {
        std::vector<std::pair<int, int>> route;
        for (const auto& coordinate : parsedData[index]) route.emplace_back(coordinate[0], coordinate[1]);
        routeDistances.emplace_back(calculateRouteDistance(route), index);
    }

    std::ranges::sort(routeDistances);

    std::cout << "Shortest Route: " << routeDistances.front().first << std::endl;
    std::cout << "Longest Route: " << routeDistances.back().first << std::endl;
    std::cout << std::format("Difference: {:.2f}", routeDistances.back().first - routeDistances.front().first) << std::endl;

    return 0;
}