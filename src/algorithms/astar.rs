use std::collections::BinaryHeap;
use std::collections::HashMap;
use std::cmp::Ordering;

// Struktur untuk merepresentasikan sebuah node dalam graf
#[derive(Debug, Copy, Clone, Eq, PartialEq)]
struct Node {
    id: usize,
    cost: usize,
    heuristic: usize,
}

// Implementasi Ord untuk Node agar dapat digunakan dalam BinaryHeap
impl Ord for Node {
    fn cmp(&self, other: &Self) -> Ordering {
        // Perbandingan terbalik agar BinaryHeap menjadi min-heap
        other.cost.cmp(&self.cost)
    }
}

impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

// Fungsi untuk menghitung jarak heuristik (contoh: jarak Manhattan)
fn heuristic(a: (isize, isize), b: (isize, isize)) -> usize {
    ((a.0 - b.0).abs() + (a.1 - b.1).abs()) as usize
}

// Algoritma A*
pub fn astar(
    graph: &HashMap<usize, Vec<(usize, usize)>>,
    start: usize,
    end: usize,
    positions: &HashMap<usize, (isize, isize)>,
) -> Option<(Vec<usize>, usize)> {
    let mut dist: HashMap<usize, usize> = HashMap::new();
    let mut pq = BinaryHeap::new();
    let mut prev: HashMap<usize, usize> = HashMap::new();

    dist.insert(start, 0);
    pq.push(Node {
        id: start,
        cost: 0 + heuristic(positions[&start], positions[&end]),
        heuristic: heuristic(positions[&start], positions[&end]),
    });

    while let Some(Node { id, cost, .. }) = pq.pop() {
        if id == end {
            let mut path = Vec::new();
            let mut curr = end;
            while let Some(&p) = prev.get(&curr) {
                path.push(curr);
                curr = p;
            }
            path.push(start);
            path.reverse();
            return Some((path, dist[&end]));
        }

        if cost > dist.get(&id).cloned().unwrap_or(usize::MAX) {
            continue;
        }

        if let Some(neighbors) = graph.get(&id) {
            for &(neighbor, weight) in neighbors {
                let new_dist = dist[&id] + weight;
                if new_dist < dist.get(&neighbor).cloned().unwrap_or(usize::MAX) {
                    dist.insert(neighbor, new_dist);
                    prev.insert(neighbor, id);
                    pq.push(Node {
                        id: neighbor,
                        cost: new_dist + heuristic(positions[&neighbor], positions[&end]),
                        heuristic: heuristic(positions[&neighbor], positions[&end]),
                    });
                }
            }
        }
    }

    None
}