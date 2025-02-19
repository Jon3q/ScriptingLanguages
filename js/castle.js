function build_tower(x: number, z: number) {
    blocks.fill(
        PACKED_ICE,
        pos(x, 0, z),
        pos(x + 4, 11, z + 4),
        FillOperation.Hollow
    )
}

function decorate_tower(x: number, z: number) {
    let y5 = 12
    for (let k = 0; k <= 4; k++) {
        if (k % 2 == 0) {
            blocks.place(BLUE_ICE, pos(x + k, y5, z))
        }
        if (k % 2 == 0) {
            blocks.place(BLUE_ICE, pos(x + k, y5, z + 4))
        }
        if (k % 2 == 0) {
            blocks.place(BLUE_ICE, pos(x, y5, z + k))
        }
        if (k % 2 == 0) {
            blocks.place(BLUE_ICE, pos(x + 4, y5, z + k))
        }
    }
}

function add_windows_to_wall(x1: number, z1: number, x2: number, z2: number, orientation: string) {
    let windowHeight = 6
    if (orientation == "horizontal") {
        let length3 = Math.abs(x2 - x1) + 1
        let step = Math.floor((length3 - 4) / 4)
        for (let i = 0; i <= 3; i++) {
            let windowX = x1 + 2 + i * step
            for (let l = 0; l <= 2; l++) {
                blocks.place(GLASS, pos(windowX, windowHeight, z1 + l))
            }
        }
    } else if (orientation == "vertical") {
        let length4 = Math.abs(z2 - z1) + 1
        let step2 = Math.floor((length4 - 2) / 4)
        for (let m = 0; m <= 3; m++) {
            let windowZ = z1 + 2 + m * step2
            for (let n = 0; n <= 2; n++) {
                blocks.place(GLASS, pos(x1 + n, windowHeight, windowZ))
            }
        }
    }
}

function clear_wall_for_gate(x: number, z: number) {
    for (let y4 = 0; y4 <= 3; y4++) {
        for (let j = 0; j <= 2; j++) {
            blocks.place(AIR, pos(x + 1 + j, y4, z))
        }
    }
}

function build_moat(x1: number, z1: number, x2: number, z2: number, width: number, offset: number) {
    let outerX1 = x1 - offset - width
    let outerZ1 = z1 - offset - width
    let outerX2 = x2 + offset + width
    let outerZ2 = z2 + offset + width
    blocks.fill(
        AIR,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX2, -1, outerZ1 + width - 5),
        FillOperation.Replace
    )
    blocks.fill(
        AIR,
        pos(outerX1, -2, outerZ2 - width + 1),
        pos(outerX2, -1, outerZ2),
        FillOperation.Replace
    )
    blocks.fill(
        AIR,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX1 + width - 1, -1, outerZ2),
        FillOperation.Replace
    )
    blocks.fill(
        AIR,
        pos(outerX2 - width + 1, -2, outerZ1 - 4),
        pos(outerX2, -1, outerZ2),
        FillOperation.Replace
    )
    blocks.fill(
        WATER,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX2, -2, outerZ1 + width - 5),
        FillOperation.Replace
    )
    blocks.fill(
        WATER,
        pos(outerX1, -2, outerZ2 - width + 1),
        pos(outerX2, -2, outerZ2),
        FillOperation.Replace
    )
    blocks.fill(
        WATER,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX1 + width - 1, -2, outerZ2),
        FillOperation.Replace
    )
    blocks.fill(
        WATER,
        pos(outerX2 - width + 1, -2, outerZ1 - 4),
        pos(outerX2, -2, outerZ2),
        FillOperation.Replace
    )
}

function decorate_wall(x1: number, z1: number, x2: number, z2: number, orientation: string) {
    let height = 9
    if (orientation == "horizontal") {
        for (let x = x1; x <= x2; x++) {
            if ((x - x1) % 2 === 0) {
                blocks.place(BLUE_ICE, pos(x, height, z1))
                blocks.place(BLUE_ICE, pos(x, height, z1 + 2))
            }
        }
    } else if (orientation == "vertical") {
        for (let z = z1; z <= z2; z++) {
            if ((z - z1) % 2 === 0) {
                blocks.place(BLUE_ICE, pos(x1, height, z))
                blocks.place(BLUE_ICE, pos(x1 + 2, height, z))
            }
        }
    }
}

function path(x: number, z: number) {
    blocks.fill(
        SNOW,
        pos(x, -1, z - 3),
        pos(x + 2, -1, z + 2),
        FillOperation.Replace
    )
    blocks.fill(
        SNOW,
        pos(x, -1, z + 6),
        pos(x + 2, -1, z + 13),
        FillOperation.Replace
    )
}

function bridge(x: number, z: number) {
    blocks.fill(
        CHERRY_SLAB,
        pos(x, 0, z + 1),
        pos(x + 2, 0, z + 1),
        FillOperation.Replace
    )
    blocks.fill(
        CHERRY_SLAB,
        pos(x, 0, z + 7),
        pos(x + 2, 0, z + 7),
        FillOperation.Replace
    )
    blocks.fill(
        PACKED_ICE,
        pos(x, 0, z + 6),
        pos(x + 2, 0, z + 6),
        FillOperation.Replace
    )
    blocks.fill(
        PACKED_ICE,
        pos(x, 0, z + 2),
        pos(x + 2, 0, z + 2),
        FillOperation.Replace
    )
    blocks.fill(
        CHERRY_SLAB,
        pos(x, 0.5, z + 3),
        pos(x + 2, 0.5, z + 5),
        FillOperation.Replace
    )
}

function build_wall(x1: number, z1: number, x2: number, z2: number, orientation: string) {
    if (orientation == "horizontal") {
        for (let y = 0; y <= 8; y++) {
            blocks.fill(
                PACKED_ICE,
                pos(x1, y, z1),
                pos(x2, y, z1 + 2),
                FillOperation.Replace
            )
        }
    } else if (orientation == "vertical") {
        for (let y2 = 0; y2 <= 8; y2++) {
            blocks.fill(
                PACKED_ICE,
                pos(x1, y2, z1),
                pos(x1 + 2, y2, z2),
                FillOperation.Replace
            )
        }
    }
}

function build_gate(x: number, z: number) {
    for (let y3 = 0; y3 <= 2; y3++) {
        blocks.place(BLUE_ICE, pos(x, y3, z))
        blocks.place(BLUE_ICE, pos(x + 4, y3, z))
    }
    for (let o = 1; o <= 3; o++) {
        blocks.place(BLUE_ICE, pos(x + o, 3, z))
    }
    blocks.place(PACKED_ICE, pos(x, 3, z))
    blocks.place(PACKED_ICE, pos(x + 4, 3, z))
    blocks.place(PACKED_ICE, pos(x + 2, 4, z))
    blocks.place(TORCH, pos(x + 2, 3, z - 1))
    blocks.fill(
        CHERRY_FENCE,
        pos(x + 1, 2, z),
        pos(x + 3, 2, z),
        FillOperation.Replace
    )
}

player.onChat("run", function () {
    blocks.fill(
        CHERRY_PLANKS,
        pos(3, -1, 0),
        pos(43, -1, 40),
        FillOperation.Replace
    )
    blocks.fill(
        CHERRY_PLANKS,
        pos(5, 4, 3),
        pos(41, 4, 39),
        FillOperation.Replace
    )
    for (let i = 4; i < 40; i += 5) {
        for (let j = 4; j < 40; j += 5) {
            blocks.place(TORCH, pos(i, 0, j))
        }
    }
    build_tower(3, 0)
    decorate_tower(3, 0)
    build_tower(19, 0)
    decorate_tower(19, 0)
    build_tower(39, 0)
    decorate_tower(39, 0)
    build_tower(3, 36)
    decorate_tower(3, 36)
    build_tower(19, 36)
    decorate_tower(19, 36)
    build_tower(39, 36)
    decorate_tower(39, 36)
    build_wall(8, 1, 39, 1, "horizontal")
    build_wall(8, 37, 39, 37, "horizontal")
    build_wall(4, 5, 4, 35, "vertical")
    build_wall(40, 5, 40, 35, "vertical")
    decorate_wall(8, 1, 39, 1, "horizontal")
    decorate_wall(8, 37, 39, 37, "horizontal")
    decorate_wall(4, 5, 4, 35, "vertical")
    decorate_wall(40, 5, 40, 35, "vertical")
    add_windows_to_wall(8, 1, 39, 1, "horizontal")
    add_windows_to_wall(8, 37, 39, 37, "horizontal")
    add_windows_to_wall(4, 5, 4, 35, "vertical")
    add_windows_to_wall(40, 5, 40, 45, "vertical")
    build_gate(11, 0)
    clear_wall_for_gate(11, 1)
    clear_wall_for_gate(11, 2)
    clear_wall_for_gate(11, 3)
    build_moat(3, 0, 43, 40, 3, 4)
    path(12, -14)
    bridge(12, -14)
})
