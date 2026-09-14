import type { RowEdge } from "./ToggleButtonGroup.types";

export function singleRowEdge(index: number, count: number): RowEdge {
    return { isRowFirst: index === 0, isRowLast: index === count - 1 };
}

export function computeRowEdges(container: HTMLElement, count: number): RowEdge[] {
    const children = Array.from(container.children) as HTMLElement[];
    const tops = children.map((el) => el.offsetTop);

    return Array.from({ length: count }, (_, i) => ({
        isRowFirst: i === 0 || tops[i] !== tops[i - 1],
        isRowLast: i === count - 1 || tops[i] !== tops[i + 1],
    }));
}

export function edgesEqual(a: RowEdge[], b: RowEdge[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((edge, i) => edge.isRowFirst === b[i].isRowFirst && edge.isRowLast === b[i].isRowLast);
}

export function getRowRoundingClass({ isRowFirst, isRowLast }: RowEdge): string {
    const left = isRowFirst ? 'lg:rounded-l-lg' : 'lg:rounded-l-none';
    const right = isRowLast ? 'lg:rounded-r-lg' : 'lg:rounded-r-none';

    return `${left} ${right}`;
}
